'use client';

import { useEffect, useState } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

export default function TabGeneratorPage() {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('tabs') : null;
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'Tab 1', content: 'Content for Tab 1' }];
  });

  // Persist tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tabs', JSON.stringify(tabs));
    }
  }, [tabs]);

  const addTab = () => {
    if (tabs.length >= 15) return;
    const nextId = tabs.length ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
    setTabs([...tabs, { id: nextId, title: `Tab ${nextId}`, content: '' }]);
  };

  const removeTab = (id: number) => setTabs(tabs.filter(t => t.id !== id));

  const updateTab = (id: number, key: 'title' | 'content', value: string) =>
    setTabs(tabs.map(t => (t.id === id ? { ...t, [key]: value } : t)));

  // Build LMS-safe (no classes, no <style>) HTML
  const generateOutput = () => {
    const buttons = tabs
      .map(
        (t, i) =>
          `<button data-idx="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" style="margin-right:4px;cursor:pointer;">${t.title}</button>`
      )
      .join('');

    const panels = tabs
      .map(
        (t, i) =>
          `<div role="tabpanel" aria-hidden="${i === 0 ? 'false' : 'true'}" style="display:${i === 0 ? 'block' : 'none'};padding:8px;border-top:1px solid #ccc;margin-top:8px;">${t.content}</div>`
      )
      .join('');

    const script = `
<script>
(function(){
  var container = document.querySelector('[data-tab-container]');
  if(!container) return;
  var buttons = container.querySelectorAll('[data-tab-buttons] button');
  var panels  = container.querySelectorAll('[data-tab-content] > div');

  function show(i){
    panels.forEach(function(p, idx){
      p.style.display = (idx === i) ? 'block' : 'none';
      p.setAttribute('aria-hidden', String(idx !== i));
    });
    buttons.forEach(function(b, idx){
      b.disabled = (idx === i);
      b.setAttribute('aria-selected', String(idx === i));
    });
  }

  buttons.forEach(function(btn, idx){
    btn.addEventListener('click', function(){ show(idx); });
  });

  show(0);
})();
</script>`.trim();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Generated Tabs</title>
</head>
<body style="font-family:sans-serif;">
  <div data-tab-container>
    <div data-tab-buttons>${buttons}</div>
    <div data-tab-content>${panels}</div>
  </div>
  ${script}
</body>
</html>`.trim();

    // Show copyable output
    const encoded = html.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const w = window.open('', '_blank');
    if (w && w.document) {
      w.document.open();
      w.document.write('<pre style="white-space:pre-wrap;word-wrap:break-word;padding:12px;">' + encoded + '</pre>');
      w.document.close();
    }
  };

  return (
    <div>
      <h1>Tab Generator</h1>
      <button onClick={addTab} disabled={tabs.length >= 15}>+ Add Tab</button>
      <div style={{ marginTop: '1rem' }}>
        {tabs.map((tab) => (
          <div key={tab.id} style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '0.5rem' }}>
            <label style={{ display: 'block', marginBottom: 4 }}>
              <span style={{ display: 'inline-block', minWidth: 70 }}>Title:</span>
              <input
                type="text"
                value={tab.title}
                onChange={(e) => updateTab(tab.id, 'title', e.target.value)}
                style={{ width: '60%' }}
              />
            </label>
            <button onClick={() => removeTab(tab.id)} style={{ marginBottom: '0.5rem' }}>– Remove</button>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'inline-block', minWidth: 70 }}>Content:</span>
              <textarea
                value={tab.content}
                onChange={(e) => updateTab(tab.id, 'content', e.target.value)}
                rows={3}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
            </label>
          </div>
        ))}
      </div>
      <button onClick={generateOutput}>Output HTML</button>
    </div>
  );
}
