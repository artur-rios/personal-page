import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { LangProvider } from '@/components/lang-provider';

const description =
  'Artur Rios — Brazilian software developer building .NET libraries, APIs and developer tools.';

export const metadata: Metadata = {
  title: {
    default: 'Artur Rios',
    template: '%s | Artur Rios',
  },
  description,
  authors: [{ name: 'Artur Rios', url: 'https://github.com/artur-rios' }],
  openGraph: {
    type: 'website',
    siteName: 'Artur Rios',
    title: 'Artur Rios',
    description,
  },
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
      <body className="flex min-h-screen flex-col bg-background text-primary">
        <LangProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
