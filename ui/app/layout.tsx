import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kekaibo | Finance Tracker',
  description: 'Little app to track my finances',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider
          className={cn(
            'grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr]',
          )}
        >
          <AppSidebar />
          <main className={cn('pl-1 pr-4 md:pl-2 md:pr-8')}>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
