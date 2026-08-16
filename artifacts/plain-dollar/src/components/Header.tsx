import { Link, useLocation } from 'wouter';

const NAV = [
  { href: '/cards/', label: 'Cards' },
  { href: '/tools/', label: 'Tools' },
  { href: '/offers/', label: 'Offers' },
  { href: '/letter/', label: 'The Letter' },
  { href: '/about/', label: 'About' },
];

export function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">

        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif font-bold no-underline shrink-0 hover:opacity-80 transition-opacity"
          style={{
            fontSize: '1.2rem',
            letterSpacing: '-0.025em',
            color: 'hsl(var(--primary))',
          }}
          data-testid="link-logo"
        >
          The Plain Dollar
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-x-1" aria-label="Main navigation">
          {NAV.map(item => {
            const active = location.startsWith(item.href) && item.href !== '/';
            return (
              <Link
                key={item.href}
                href={item.href}
                className="no-underline px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                style={{
                  color: active ? 'hsl(var(--primary))' : 'hsl(211 12% 38%)',
                  background: active ? 'hsl(var(--muted))' : 'transparent',
                }}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
