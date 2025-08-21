'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname() || '/';
  const parts = pathname.split('/').filter(Boolean);

  const itemStyle: React.CSSProperties = { display: 'inline-block', marginRight: 8 };
  const Sep = () => <span style={{ marginRight: 8 }} aria-hidden="true">›</span>;

  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: '0.9rem', margin: '0.5rem 1rem' }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={itemStyle}>
          <Link href="/">Home</Link>
        </li>
        {parts.map((p, i) => {
          const href = '/' + parts.slice(0, i + 1).join('/');
          const label = p.replace(/-/g, ' ');
          const last = i === parts.length - 1;
          return (
            <li key={href} style={itemStyle} aria-current={last ? 'page' : undefined}>
              <Sep />
              {last ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
