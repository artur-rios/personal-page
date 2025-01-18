import type { Metadata, Viewport } from 'next';
import './globals.css';
import React, { Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { LangProvider } from '@/components/lang-provider';

export const metadata: Metadata = {
  title: 'Artur Rios',
  description: 'Brazilian software developer',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col bg-background text-primary`}>
        <Suspense>
          <LangProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </LangProvider>
        </Suspense>
      </body>
    </html>
  );
}
