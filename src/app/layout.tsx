import type { Metadata } from 'next';
import './globals.css';
import Header, { Footer } from '@/components/Header';

export const metadata: Metadata = {
  title: 'CWA Assignment 1',
  description: 'Front-end app for generating LMS-friendly HTML+JS (inline CSS only)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Header studentNumber="20959041" />
        <main style={{ padding: '1rem' }}>{children}</main>
        <Footer studentName="Dylan Fernando" studentNumber="20959041" />
      </body>
    </html>
  );
}
