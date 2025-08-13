'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Read saved theme and apply on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' && window.localStorage.getItem('theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    root.style.background = isDark ? '#111' : '#fff';
    root.style.color = isDark ? '#eee' : '#000';
  };

  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      aria-label="Toggle dark/light mode"
      onClick={toggle}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
