'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, read the saved theme
  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'dark') {
      setDarkMode(true);
      document.documentElement.style.background = '#111';
      document.documentElement.style.color = '#eee';
    }
  }, []);

  const toggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.style.background = next ? '#111' : '#fff';
    document.documentElement.style.color = next ? '#eee' : '#000';
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      aria-label="Toggle dark/light mode"
      onClick={toggle}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
