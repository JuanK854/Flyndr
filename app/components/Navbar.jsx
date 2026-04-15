'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState('dark');

  const links = [
    { href: '/', label: 'Buscar', icon: SearchIcon },
    { href: '/favorites', label: 'Favoritos', icon: HeartIcon },
  ];

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('flyndr-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = saved === 'dark' || saved === 'light'
      ? saved
      : (systemPrefersLight ? 'light' : 'dark');

    root.classList.remove('dark', 'light');
    root.classList.add(initialTheme);
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove('dark', 'light');
    root.classList.add(nextTheme);
    localStorage.setItem('flyndr-theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--nav-border)] bg-[color:var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-amber to-accent-cyan flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-1 ring-[color:var(--border-subtle)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-base tracking-tight">Flyndr</span>
            <p className="text-[10px] uppercase tracking-[0.22em] text-txt-muted -mt-0.5">Travel Ledger</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-ghost inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>

          <div className="flex items-center gap-1 rounded-xl border border-[color:var(--nav-pill-border)] bg-[color:var(--nav-pill-bg)] p-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-txt-primary bg-[color:var(--nav-active-bg)] border border-[color:var(--nav-active-border)]'
                    : 'text-txt-secondary hover:text-txt-primary hover:bg-[color:var(--surface-ticket)]'
                }`}
              >
                <Icon size={15} active={active} />
                {label}
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function SearchIcon({ size, active }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={active ? 'var(--accent-cyan)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function HeartIcon({ size, active }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill={active ? 'var(--accent-cyan)' : 'none'}
         stroke={active ? 'var(--accent-cyan)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a8.8 8.8 0 1 0 9 11.2A7 7 0 1 1 12 3z"/>
    </svg>
  );
}
