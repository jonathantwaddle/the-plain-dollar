import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-10 px-6 md:px-8 bg-white" data-testid="site-footer">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-8">
        <div>
          <p
            className="font-serif font-bold text-primary mb-1"
            style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}
          >
            The Plain Dollar
          </p>
          <p className="text-sm" style={{ color: 'hsl(0 0% 45%)' }}>
            <a href="mailto:jon@theplaindollar.com" className="no-underline hover:underline text-inherit">
              jon@theplaindollar.com
            </a>
            <br />
            Corrections and press only.
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm max-w-sm"
          aria-label="Footer navigation"
          style={{ color: 'hsl(0 0% 40%)' }}
        >
          {[
            { href: '/how-we-make-money/', label: 'How we make money' },
            { href: '/methodology/', label: 'How we rate' },
            { href: '/advertiser-disclosure/', label: 'Disclosure' },
            { href: '/contact/', label: 'Contact' },
            { href: '/privacy/', label: 'Privacy' },
            { href: '/guides/', label: 'Guides' },
            { href: '/glossary/', label: 'Glossary' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary no-underline hover:underline"
              style={{ color: 'inherit' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-5 border-t border-border">
        <p className="text-xs" style={{ color: 'hsl(0 0% 60%)' }}>
          © 2026 The Plain Dollar. Independent. Not owned by a bank, card company, or insurance company.
        </p>
      </div>
    </footer>
  );
}
