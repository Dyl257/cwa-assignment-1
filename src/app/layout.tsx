import './globals.css';
import Header, { Footer } from '@/components/Header';

export const metadata = {
  title: 'CWA Assignment 1',
  description: 'Front-end app for generating HTML5+JS code',
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
