import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About | CWA Assignment 1' };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1>About</h1>
      <p><strong>Name:</strong> Dylan Fernando</p>
      <p><strong>Student #:</strong> 20959041</p>

      <h2>How to use this website (video)</h2>
      {/* YouTube embed (privacy-enhanced domain) */}
      <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: 16 }}>
        <iframe
          title="Assignment 1 Walkthrough"
          src="https://www.youtube-nocookie.com/embed/TaDg3JDfQOk"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '0' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
