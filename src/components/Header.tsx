'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

// cookie helpers
function setCookie(name: string, value: string, days = 180) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}
function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

export default function Header({ studentNumber = '20959041' }: { studentNumber?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('/');

  useEffect(() => {
    let saved: string | null = null;
    if (typeof window !== 'undefined') {
      saved = getCookie('activeNav') || window.localStorage.getItem('activeNav');
      if (!saved) saved = window.location.pathname;
      setActive(saved);
    }
  }, []);

  const remember = (path: string) => {
    setActive(path);
    if (typeof window !== 'undefined') {
      setCookie('activeNav', path);
      window.localStorage.setItem('activeNav', path);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const linkStyle = (path: string) => ({
    display: 'inline-block',
    padding: '0.25rem 0',
    fontWeight: active === path ? ('bold' as const) : 'normal',
  });

  return (
    <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.75rem 1rem', borderBottom:'1px solid #ccc', position:'relative' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
        <button aria-label="Toggle navigation menu" onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize:'1.5rem', background:'none', border:'none', cursor:'pointer' }}>☰</button>
        <span style={{ fontWeight:'bold' }}>CWA Assignment</span>
        <span aria-label="Student number">Student #: {studentNumber}</span>
      </div>

      <div style={{ display:'flex', alignItems:'center' }}>
        <ThemeToggle />
      </div>

      {menuOpen && (
        <nav aria-label="Main navigation" style={{ position:'absolute', top:'100%', left:0, right:0, background:'#fff', padding:'1rem', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', zIndex:10 }}>
          <ul style={{ listStyle:'none', padding:0, margin:0 }}>
            <li><Link href="/" onClick={() => remember('/')} style={linkStyle('/')}>Home</Link></li>
            <li><Link href="/about" onClick={() => remember('/about')} style={linkStyle('/about')}>About</Link></li>
            <li><Link href="/escape-room" onClick={() => remember('/escape-room')} style={linkStyle('/escape-room')}>Escape Room</Link></li>
            <li><Link href="/coding-races" onClick={() => remember('/coding-races')} style={linkStyle('/coding-races')}>Coding Races</Link></li>
            <li><Link href="/court-room" onClick={() => remember('/court-room')} style={linkStyle('/court-room')}>Court Room</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer({ studentName = 'Dylan Fernando', studentNumber = '20959041' }: { studentName?: string; studentNumber?: string }) {
  const today = new Date().toLocaleDateString();
  return (
    <footer style={{ borderTop:'1px solid #ccc', padding:'1rem', textAlign:'center' }}>
      <div>&copy; {new Date().getFullYear()} {studentName}</div>
      <div>Student #: {studentNumber}</div>
      <div>Date: {today}</div>
    </footer>
  );
}

