import type { Metadata } from 'next';
import './globals.css';
import Header, { Footer } from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'CWA Assignment 1',
  description: 'Front-end app for generating LMS-friendly HTML+JS (inline CSS only)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {/* Always-visible skip link (no event handlers, safe for Server Components) */}
        <a
          href="#main"
          style={{
            position: 'fixed',
            left: '8px',
            top: '8px',
            padding: '8px',
            background: '#ffd',
            border: '1px solid #ccc',
            textDecoration: 'none',
            zIndex: 9999,
          }}
        >
          Skip to content
        </a>

        <Header studentNumber="20959041" />
        <Breadcrumbs />
        <main id="main" style={{ padding: '1rem' }}>{children}</main>
        <Footer studentName="Dylan Fernando" studentNumber="20959041" />
      </body>
    </html>
  );
}
