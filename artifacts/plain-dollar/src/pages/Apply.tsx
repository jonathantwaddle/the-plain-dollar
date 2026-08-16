import { useState, type FormEvent } from 'react';
import { useLocation } from 'wouter';
import { allCards } from '@/data';
import type { CardData } from '@/types';
import { Link } from 'wouter';

// ── Spend-engine ─────────────────────────────────────────────────────────────
// All math stays on the device. Nothing is posted to a server.

interface SpendParams {
  groceries: number;
  other: number;
  balance: boolean;
  travel: boolean;
}

interface CardScore {
  card: CardData;
  yearOneValue: number;
  ongoingValue: number;
  topReason: string;
}

const GROCERY_REWARDS: Record<string, { groceryRate: number; otherRate: number }> = {
  'amex-blue-cash-everyday':        { groceryRate: 0.03,   otherRate: 0.01   },
  'bank-of-america-customized-cash':{ groceryRate: 0.03,   otherRate: 0.01   },
  'capital-one-savorone':           { groceryRate: 0.03,   otherRate: 0.01   },
  'capital-one-ventureone':         { groceryRate: 0.0125, otherRate: 0.0125 },
  'chase-freedom-flex':             { groceryRate: 0.05,   otherRate: 0.015  },
  'chase-freedom-unlimited':        { groceryRate: 0.015,  otherRate: 0.015  },
  'citi-double-cash':               { groceryRate: 0.02,   otherRate: 0.02   },
  'citi-simplicity':                { groceryRate: 0,      otherRate: 0      },
  'discover-it-cash-back':          { groceryRate: 0.02,   otherRate: 0.01   },
  'discover-it-miles':              { groceryRate: 0.015,  otherRate: 0.015  },
  'wells-fargo-active-cash':        { groceryRate: 0.02,   otherRate: 0.02   },
  'amex-blue-cash-preferred':       { groceryRate: 0.06,   otherRate: 0.01   },
  'capital-one-venture-rewards':    { groceryRate: 0.02,   otherRate: 0.02   },
  'chase-sapphire-preferred':       { groceryRate: 0.03,   otherRate: 0.02   },
  'amex-gold-card':                 { groceryRate: 0.04,   otherRate: 0.025  },
  'capital-one-venture-x':         { groceryRate: 0.02,   otherRate: 0.02   },
  'chase-sapphire-reserve':         { groceryRate: 0.01,   otherRate: 0.03   },
};

const EFFECTIVE_FEES: Record<string, number> = {
  'amex-gold-card':        10,
  'capital-one-venture-x': 0,
  'chase-sapphire-reserve':250,
};

function scoreCard(card: CardData, params: SpendParams): CardScore | null {
  const rates = GROCERY_REWARDS[card.slug] ?? { groceryRate: 0.01, otherRate: 0.01 };
  const effectiveFee = EFFECTIVE_FEES[card.slug] ?? card.annual_fee;

  const groceryCap = card.slug === 'amex-blue-cash-preferred' ? 500 :
                     card.slug === 'amex-gold-card'           ? 2083 :
                     params.groceries;
  const monthlyGroceryReward = Math.min(params.groceries, groceryCap) * rates.groceryRate;
  const monthlyOtherReward = params.other * rates.otherRate;
  const annualReward = (monthlyGroceryReward + monthlyOtherReward) * 12;
  const bonusValue = card.intro_offer ? 200 : 0;
  const ongoingValue = annualReward - effectiveFee;
  const yearOneValue = ongoingValue + bonusValue;

  let topReason = card.best_for[0] ?? card.rating_reason.substring(0, 80);
  if (params.balance && card.tags.includes('balance-transfer')) {
    topReason = `Long 0% intro APR — best for paying off a balance`;
  } else if (params.travel && card.tags.includes('travel')) {
    topReason = `Travel rewards — miles or points on every purchase`;
  }

  return { card, yearOneValue, ongoingValue, topReason };
}

function runEngine(params: SpendParams): CardScore[] {
  let pool = allCards;
  if (params.balance) {
    const btCards = allCards.filter(c => c.tags.includes('balance-transfer') && c.annual_fee === 0);
    const others = allCards.filter(c => !c.tags.includes('balance-transfer'));
    pool = [...btCards, ...others];
  } else if (params.travel) {
    const travelCards = allCards.filter(c => c.tags.includes('travel'));
    const others = allCards.filter(c => !c.tags.includes('travel'));
    pool = [...travelCards, ...others];
  }

  return pool
    .map(c => scoreCard(c, params))
    .filter((s): s is CardScore => s !== null)
    .sort((a, b) => b.ongoingValue - a.ongoingValue)
    .slice(0, 2);
}

function dollarFmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function ResultCard({ score, rank }: { score: CardScore; rank: 1 | 2 }) {
  const { card } = score;
  const isPrimary = rank === 1;

  return (
    <div
      className="rounded-xl overflow-hidden bg-white flex flex-col"
      style={{
        border: isPrimary ? '2px solid hsl(var(--primary))' : '1.5px solid hsl(var(--border))',
        boxShadow: isPrimary ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      }}
      data-testid={`result-card-${rank}`}
    >
      {/* Label band */}
      <div
        className="px-5 py-2.5"
        style={{ background: isPrimary ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }}
      >
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: isPrimary ? 'white' : 'hsl(0 0% 50%)' }}>
          {isPrimary ? 'Our pick' : 'Runner-up'}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="font-serif font-bold mb-0.5" style={{ fontSize: isPrimary ? '1.4rem' : '1.2rem', color: 'hsl(var(--primary))', lineHeight: 1.2 }}>
          {card.name}
        </h2>
        <p className="text-sm mb-3" style={{ color: 'hsl(0 0% 50%)' }}>
          {card.issuer} · Annual fee:{' '}
          <strong style={{ color: 'hsl(0 0% 30%)' }}>{card.annual_fee === 0 ? '$0' : `$${card.annual_fee}`}</strong>
        </p>
        <p className="text-sm mb-4 flex-1" style={{ color: 'hsl(0 0% 32%)' }}>{score.topReason}</p>

        {/* Value summary */}
        <div className="rounded-xl p-4 mb-4" style={{ background: isPrimary ? 'hsl(211 52% 97%)' : 'hsl(var(--muted))' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(0 0% 55%)' }}>Estimated value</p>
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="font-serif font-bold" style={{ fontSize: '2rem', color: 'hsl(var(--primary))', lineHeight: 1 }}>
              {dollarFmt(score.yearOneValue)}
            </span>
            <span className="text-sm" style={{ color: 'hsl(0 0% 52%)' }}>year one</span>
          </div>
          {card.intro_offer && <p className="text-xs mb-1" style={{ color: 'hsl(0 0% 55%)' }}>Includes welcome offer</p>}
          <p className="text-sm" style={{ color: 'hsl(0 0% 45%)' }}>
            <strong>{dollarFmt(score.ongoingValue)}</strong> a normal year after that
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 mt-auto">
          <a
            href={card.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-center px-5 py-3 font-bold rounded-xl min-h-[48px] flex items-center justify-center no-underline transition-all ${isPrimary ? 'btn-gold' : 'bg-muted text-foreground border border-border hover:bg-border'}`}
            style={{ fontSize: '0.9rem' }}
            data-testid={`apply-${card.slug}`}
          >
            Apply on {card.issuer}'s site →
          </a>
          {card.apply_is_affiliate && <span className="badge-affiliate self-start">Affiliate link</span>}
          <p className="text-xs" style={{ color: 'hsl(0 0% 58%)' }}>
            {card.apply_is_affiliate ? 'Affiliate link. ' : ''}We never rank by affiliate payout.
          </p>
          <Link href={`/cards/reviews/${card.slug}/`} className="text-sm font-medium">Read our full review</Link>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

function parseParams(search: string): SpendParams {
  const p = new URLSearchParams(search);
  return {
    groceries: Number(p.get('groceries') ?? 0),
    other: Number(p.get('other') ?? 0),
    balance: p.get('balance') === 'yes',
    travel: p.get('travel') === 'yes',
  };
}

export default function Apply() {
  const [, navigate] = useLocation();
  const params = parseParams(typeof window !== 'undefined' ? window.location.search : '');

  const [groceries, setGroceries] = useState(params.groceries > 0 ? String(params.groceries) : '');
  const [other, setOther] = useState(params.other > 0 ? String(params.other) : '');
  const [balance, setBalance] = useState(params.balance);

  const hasInputs = params.groceries > 0 || params.other > 0 || params.balance || params.travel;
  const results = hasInputs ? runEngine(params) : [];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      groceries: groceries || '0',
      other: other || '0',
      ...(balance ? { balance: 'yes' } : {}),
    });
    navigate(`/apply/?${q}`);
    window.location.href = `/apply/?${q}`;
  }

  return (
    <div>
      {/* ── Navy hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <span className="eyebrow mb-4">Card Finder · The Plain Dollar</span>
          <h1
            className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'white' }}
          >
            Find your card
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'hsl(210 25% 72%)' }}>
            Tell us how you spend. We show one pick and one runner-up. Math stays on your device.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-14">

        {/* Spend form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-border p-6 md:p-8 mb-10 -mt-8 relative"
          style={{ boxShadow: 'var(--shadow-lg)' }}
          data-testid="spend-form"
        >
          <p className="text-sm font-semibold mb-5" style={{ color: 'hsl(211 20% 38%)' }}>
            What you put on a debit or credit card each month — not ACH transfers or automatic bill payments
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="apply-groceries" className="block text-sm font-bold mb-1.5" style={{ color: 'hsl(211 20% 20%)' }}>
                Groceries per month
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold select-none" style={{ color: 'hsl(0 0% 50%)' }}>$</span>
                <input id="apply-groceries" type="number" min="0" max="5000" step="10" placeholder="0"
                  value={groceries} onChange={e => setGroceries(e.target.value)}
                  className="w-full pl-7 pr-3 py-3 font-medium" data-testid="input-groceries" />
              </div>
            </div>
            <div>
              <label htmlFor="apply-other" className="block text-sm font-bold mb-1.5" style={{ color: 'hsl(211 20% 20%)' }}>
                Everything else per month
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold select-none" style={{ color: 'hsl(0 0% 50%)' }}>$</span>
                <input id="apply-other" type="number" min="0" max="20000" step="10" placeholder="0"
                  value={other} onChange={e => setOther(e.target.value)}
                  className="w-full pl-7 pr-3 py-3 font-medium" data-testid="input-other" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input type="checkbox" checked={balance} onChange={e => setBalance(e.target.checked)}
                className="accent-primary w-4 h-4 rounded" data-testid="check-balance" />
              I am carrying a balance I want to pay off
            </label>
            <button type="submit" className="btn-gold" data-testid="btn-show-card">Show me a card →</button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-serif font-bold text-primary mb-6">
              {results.length === 1 ? 'Our pick' : 'Our pick and runner-up'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((s, i) => (
                <ResultCard key={s.card.slug} score={s} rank={(i + 1) as 1 | 2} />
              ))}
            </div>
            <p className="mt-6 text-sm" style={{ color: 'hsl(0 0% 52%)' }}>
              We never sort or rank by affiliate payout.{' '}
              <Link href="/how-we-make-money/">How we make money</Link> ·{' '}
              <Link href="/methodology/">How we rate</Link>
            </p>
          </div>
        )}

        {/* No-input state */}
        {!hasInputs && (
          <div className="border-t border-border pt-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'hsl(0 0% 55%)' }}>
              Or browse by situation
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Paying off a balance', href: '/apply/?balance=yes' },
                { label: 'Cash back, no annual fee', href: '/apply/?other=500' },
                { label: 'Groceries are my biggest spend', href: '/apply/?groceries=400&other=200' },
                { label: 'Travel once or twice a year', href: '/apply/?travel=yes&other=500' },
              ].map(d => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="flex items-center justify-between bg-white border border-border rounded-xl px-5 py-4 font-semibold no-underline hover:border-primary hover:text-primary transition-colors group"
                  style={{ boxShadow: 'var(--shadow-xs)', color: 'hsl(var(--foreground))', fontSize: '0.95rem' }}
                >
                  {d.label}
                  <span className="text-base transition-transform group-hover:translate-x-0.5" style={{ color: 'hsl(var(--primary) / 0.4)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
