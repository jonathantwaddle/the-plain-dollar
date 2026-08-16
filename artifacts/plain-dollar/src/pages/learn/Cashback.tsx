import { Link } from 'wouter';

const cardTypes = [
  {
    title: 'Flat-rate cards',
    desc: 'You earn the same percentage on every purchase — no categories, no tracking. Examples: Wells Fargo Active Cash (2%), Citi Double Cash (2%).',
    note: 'Best for people who want simplicity and do not want to think about categories.',
  },
  {
    title: 'Category-based cards',
    desc: 'You earn a higher rate on specific spending categories (groceries, dining, gas) and a lower rate on everything else. Examples: Amex Blue Cash Preferred (6% at supermarkets), Capital One SavorOne (3% on dining).',
    note: "Best for people whose spending concentrates in specific categories.",
  },
  {
    title: 'Rotating category cards',
    desc: 'The bonus category changes every three months, and you have to activate the bonus each quarter. Examples: Chase Freedom Flex, Discover it Cash Back.',
    note: 'Best for people willing to track categories for higher rewards. Not for everyone.',
  },
];

export default function Cashback() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/learn/" className="text-sm" style={{ color: '#0057b8' }}>
          ← Back to Learn
        </Link>
      </div>

      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
        Learn · Cashback
      </p>
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
        How cashback really works
      </h1>
      <p className="text-sm mb-10" style={{ color: 'hsl(0 0% 50%)' }}>
        By Jon Twaddle · Updated August 2026 · 4 min read
      </p>

      <div className="prose prose-lg max-w-none text-foreground mb-12">
        <p>
          When you swipe your credit card at a store, the store pays a small fee to the card
          network — typically 1.5% to 3% of the purchase. This is called an interchange fee. The
          card issuer (your bank) keeps most of this fee. When a card advertises 2% cashback, the
          bank is giving you a fraction of that interchange fee back.
        </p>
        <p>
          You are not getting something for free. You are getting a rebate on a fee that was already
          baked into the price. Merchants cannot legally charge credit card users more than cash
          users in most situations, so the cashback goes to cardholders — not to people who pay
          cash.
        </p>
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary mb-8">
        Types of cashback cards
      </h2>
      <div className="space-y-5 mb-12">
        {cardTypes.map(t => (
          <div key={t.title} className="border border-border rounded bg-card p-6">
            <h3 className="font-serif font-semibold text-primary text-xl mb-3">{t.title}</h3>
            <p className="mb-3" style={{ color: 'hsl(0 0% 35%)' }}>
              {t.desc}
            </p>
            <p className="text-sm" style={{ color: 'hsl(0 0% 50%)' }}>
              <strong>Best for:</strong> {t.note}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-muted border border-border rounded p-6 mb-12">
        <h3 className="font-serif font-semibold text-primary text-xl mb-4">
          How to earn more without changing habits
        </h3>
        <ol className="list-decimal pl-5 space-y-3" style={{ color: 'hsl(0 0% 35%)' }}>
          <li>
            Match your card to your biggest spending category. If groceries are your largest
            expense, get a card with a high grocery rate.
          </li>
          <li>
            Use a flat-rate card for everything else. A 2% card on miscellaneous spending beats a
            1% default rate.
          </li>
          <li>
            Pay the balance in full every month. Interest charges will always cost more than what
            you earn in cashback.
          </li>
        </ol>
      </div>

      <div className="border-t border-border pt-8">
        <p
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'hsl(0 0% 55%)' }}
        >
          Related
        </p>
        <Link href="/cards/best/cash-back/" className="text-xl font-serif font-semibold" style={{ color: '#0057b8' }}>
          Best cash-back cards →
        </Link>
      </div>
    </div>
  );
}
