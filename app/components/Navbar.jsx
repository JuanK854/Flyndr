'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Search', icon: SearchIcon },
    { href: '/favorites', label: 'Favorites', icon: HeartIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-14">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
          </div>
          <span className="font-display font-bold text-base tracking-tight">
            Flyndr
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-txt-secondary hover:text-txt-primary hover:bg-white/5'
                }`}
              >
                <Icon size={15} active={active} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function SearchIcon({ size, active }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={active ? '#00d4ff' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function HeartIcon({ size, active }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill={active ? '#00d4ff' : 'none'}
         stroke={active ? '#00d4ff' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
