import { type FormEvent, useState } from 'react';
import { Link, useLocation } from 'wouter';

const DOORS = [
  {
    label: 'Pay off a balance',
    desc: '0% intro APR cards that buy you time',
    href: '/apply/?balance=yes',
  },
  {
    label: 'Cash back, no fee',
    desc: 'Flat 2% on everything, no annual cost',
    href: '/apply/?other=500',
  },
  {
    label: 'Groceries',
    desc: 'Up to 6% back at US supermarkets',
    href: '/apply/?groceries=400&other=200',
  },
  {
    label: 'Travel once a year',
    desc: 'Miles or points, no exotic hobby required',
    href: '/apply/?travel=yes&other=500',
  },
] as const;

export default function Home() {
  const [, navigate] = useLocation();
  const [groceries, setGroceries] = useState('');
  const [other, setOther] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      groceries: groceries || '0',
      other: other || '0',
    });
    navigate(`/apply/?${q}`);
  }

  return (
    <div>
      {/* ── Full-bleed navy hero ──────────────────────── */}
      <div className="panel-dark w-full">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-14">
          <span className="eyebrow mb-5">Independent · Jon Twaddle</span>
          <h1
            className="font-serif font-bold mb-5"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'white',
            }}
          >
            What is the best<br className="hidden sm:block" /> credit card?
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: 'hsl(210 25% 72%)' }}>
            There is not one. There is one that fits how <em>you</em> spend.
          </p>
        </div>
      </div>

      {/* ── White body ───────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-14">

        {/* Spend form */}
        <div
          className="bg-white rounded-xl p-7 md:p-8 mb-10 -mt-8 relative"
          style={{ boxShadow: 'var(--shadow-lg)', border: '1px solid hsl(var(--border))' }}
        >
          <p className="text-sm font-semibold mb-5" style={{ color: 'hsl(211 20% 35%)' }}>
            What you put on a card each month — not ACH or automatic bill payments
          </p>
          <form onSubmit={handleSubmit} data-testid="home-spend-form" aria-label="Card finder">
            <div className="flex flex-wrap gap-4 items-end mb-5">
              <div className="flex-1 min-w-[130px]">
                <label
                  htmlFor="home-groceries"
                  className="block text-sm font-bold mb-1.5"
                  style={{ color: 'hsl(211 20% 20%)' }}
                >
                  Groceries&nbsp;$/mo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold select-none" style={{ color: 'hsl(0 0% 50%)' }}>$</span>
                  <input
                    id="home-groceries"
                    type="number"
                    min="0"
                    max="5000"
                    step="10"
                    placeholder="0"
                    value={groceries}
                    onChange={e => setGroceries(e.target.value)}
                    className="w-full pl-7 pr-3 py-3 text-base font-medium"
                    data-testid="input-home-groceries"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="home-other"
                  className="block text-sm font-bold mb-1.5"
                  style={{ color: 'hsl(211 20% 20%)' }}
                >
                  Everything else&nbsp;$/mo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold select-none" style={{ color: 'hsl(0 0% 50%)' }}>$</span>
                  <input
                    id="home-other"
                    type="number"
                    min="0"
                    max="20000"
                    step="10"
                    placeholder="0"
                    value={other}
                    onChange={e => setOther(e.target.value)}
                    className="w-full pl-7 pr-3 py-3 text-base font-medium"
                    data-testid="input-home-other"
                  />
                </div>
              </div>

              <div className="shrink-0">
                <button type="submit" className="btn-gold" data-testid="btn-home-submit">
                  Show me a card →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Four doors */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'hsl(0 0% 55%)' }}>
            Or pick a situation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DOORS.map(door => (
              <Link
                key={door.href}
                href={door.href}
                className="group flex items-center justify-between gap-3 bg-white rounded-xl px-5 py-4 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-primary"
                style={{
                  border: '1.5px solid hsl(var(--border))',
                  boxShadow: 'var(--shadow-sm)',
                }}
                data-testid={`door-${door.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div>
                  <p className="font-bold mb-0.5 transition-colors group-hover:text-primary" style={{ color: 'hsl(211 20% 18%)', fontSize: '0.95rem' }}>
                    {door.label}
                  </p>
                  <p className="text-sm" style={{ color: 'hsl(0 0% 52%)' }}>
                    {door.desc}
                  </p>
                </div>
                <span
                  className="text-lg shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: 'hsl(var(--primary) / 0.3)' }}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust line */}
        <p className="text-sm border-t border-border pt-6 pb-2" style={{ color: 'hsl(0 0% 52%)' }}>
          Independent. We never rank by what a card pays us.{' '}
          <Link href="/how-we-make-money/">How we make money</Link>
        </p>
      </div>
    </div>
  );
}
