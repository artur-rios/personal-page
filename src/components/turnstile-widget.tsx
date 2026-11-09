'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  onToken: (token: string) => void;
  /** Turnstile could not load or run, so a token may never come. */
  onFailure: () => void;
  /** A token works once, so changing this asks the visitor's browser for a new one. */
  resetKey: number;
}

export default function TurnstileWidget({
  siteKey,
  onToken,
  onFailure,
  resetKey,
}: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const latestOnToken = useRef(onToken);
  const latestOnFailure = useRef(onFailure);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    latestOnToken.current = onToken;
    latestOnFailure.current = onFailure;
  }, [onToken, onFailure]);

  useEffect(() => {
    if (!ready || !container.current || !window.turnstile) {
      return;
    }

    const turnstile = window.turnstile;
    const id = turnstile.render(container.current, {
      sitekey: siteKey,
      callback: (token) => latestOnToken.current(token),
      'expired-callback': () => latestOnToken.current(''),
      'error-callback': () => {
        latestOnToken.current('');
        latestOnFailure.current();
      },
    });

    widgetId.current = id;

    return () => {
      turnstile.remove(id);
      widgetId.current = null;
    };
  }, [ready, siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetId.current) {
      window.turnstile?.reset(widgetId.current);
    }
  }, [resetKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
        onError={() => latestOnFailure.current()}
      />
      <div ref={container} />
    </>
  );
}
