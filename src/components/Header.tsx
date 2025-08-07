'use client';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ studentNumber = '20959041' }: { studentNumber?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '1rem',
      borderBottom: '1px solid #ccc', position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ marginRight: '1rem', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ☰
        </button>
        <span style={{ fontWeight: 'bold' }}>CWA Assignment</span>
      </div>

      {menuOpen && (
        <nav aria-label="Main navigation" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#fff', padding: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/escape-room">Escape Room</a></li>
            <li><a href="/coding-races">Coding Races</a></li>
            <li><a href="/court-room">Court Room</a></li>
          </ul>
        </nav>
      )}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeToggle />
        <span style={{ marginLeft: '1rem' }}>Student #: {studentNumber}</span>
      </div>
    </header>
  );
}

export function Footer({
  studentName = 'Dylan Fernando',
  studentNumber = '20959041'
}: { studentName?: string; studentNumber?: string }) {
  const today = new Date().toLocaleDateString();
  return (
    <footer style={{
      borderTop: '1px solid #ccc',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <div>&copy; {new Date().getFullYear()} {studentName}</div>
      <div>Student #: {studentNumber}</div>
      <div>Date: {today}</div>
    </footer>
  );
}

