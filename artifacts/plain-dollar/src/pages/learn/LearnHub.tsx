import { Link } from 'wouter';

const modules = [
  {
    slug: 'credit-score',
    title: 'How your credit score works',
    description: 'The five factors that determine your FICO score, explained simply.',
    href: '/learn/credit-score/',
    time: '5 min read',
  },
  {
    slug: 'cashback',
    title: 'How cashback really works',
    description: 'Where the money comes from, and how to earn more without changing your habits.',
    href: '/learn/cashback/',
    time: '4 min read',
  },
  {
    slug: 'banking-basics',
    title: 'Banking basics',
    description: 'Checking, savings, and high-yield accounts — and why the difference matters.',
    href: '/learn/banking-basics/',
    time: '4 min read',
  },
];

export default function LearnHub() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Learn</p>
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
        Learn how money works
      </h1>
      <p className="text-xl mb-12 max-w-2xl" style={{ color: 'hsl(0 0% 40%)' }}>
        Three short guides to help you understand credit cards, cashback, and banking. No jargon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {modules.map((m, i) => (
          <Link
            key={m.slug}
            href={m.href}
            className="block border border-border bg-card rounded p-6 no-underline hover:border-accent transition-colors group"
            data-testid={`learn-module-${m.slug}`}
          >
            <div
              className="text-4xl font-serif font-bold mb-4 leading-none"
              style={{ color: 'hsl(117 24% 15% / 0.15)' }}
            >
              0{i + 1}
            </div>
            <h2 className="text-xl font-serif font-semibold text-primary mb-3 group-hover:text-accent">
              {m.title}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(0 0% 40%)' }}>
              {m.description}
            </p>
            <span className="text-sm font-medium" style={{ color: '#0057b8' }}>
              Read · {m.time} →
            </span>
          </Link>
        ))}
      </div>

      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
          Ready to find a card?
        </h2>
        <p className="mb-4" style={{ color: 'hsl(0 0% 40%)' }}>
          Once you understand the basics, use our card finder to match a card to how you spend.
        </p>
        <Link href="/cards/" className="btn-gold">
          Browse all cards →
        </Link>
      </div>
    </div>
  );
}
