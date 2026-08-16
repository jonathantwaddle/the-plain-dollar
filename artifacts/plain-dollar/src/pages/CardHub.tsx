import { Link } from 'wouter';
import { bestOfLists, allCards } from '@/data';

export default function CardHub() {
  return (
    <div>
      {/* ── Full-bleed navy hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-18">
          <span className="eyebrow mb-4">The Plain Dollar</span>
          <h1
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'white',
            }}
          >
            Credit Cards
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'hsl(210 25% 72%)', maxWidth: '52ch' }}>
            We review credit cards based on how much value they provide compared to their annual fee.
            No marketing copy. Real numbers, checked by hand.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14 space-y-14">

        {/* Best-of lists */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-1 pb-0">Best-of lists</h2>
          <p className="text-sm mb-6" style={{ color: 'hsl(0 0% 52%)' }}>Curated picks for common situations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestOfLists.filter(l => l.kind === 'cards').map(list => (
              <Link
                key={list.slug}
                href={`/cards/best/${list.slug}/`}
                className="group bg-white rounded-xl px-6 py-5 no-underline transition-all hover:-translate-y-0.5 hover:border-primary"
                style={{ border: '1.5px solid hsl(var(--border))', boxShadow: 'var(--shadow-sm)', display: 'block' }}
              >
                <h3 className="font-bold text-primary mb-1 transition-colors group-hover:text-accent" style={{ fontSize: '1rem' }}>
                  {list.title}
                </h3>
                <p className="text-sm" style={{ color: 'hsl(0 0% 52%)' }}>{list.audience_line}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* All cards */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-1">All cards we cover</h2>
          <p className="text-sm mb-6" style={{ color: 'hsl(0 0% 52%)' }}>{allCards.length} reviews, checked by hand</p>
          <div className="bg-white rounded-xl border border-border overflow-hidden" style={{ boxShadow: 'var(--shadow-xs)' }}>
            <ul className="divide-y divide-border">
              {allCards.map(card => (
                <li key={card.slug}>
                  <Link
                    href={`/cards/reviews/${card.slug}/`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-muted no-underline transition-colors gap-4"
                  >
                    <div>
                      <span className="font-semibold" style={{ color: 'hsl(var(--foreground))', fontSize: '0.95rem' }}>
                        {card.name}
                      </span>
                      <span className="text-sm ml-2" style={{ color: 'hsl(0 0% 52%)' }}>
                        {card.issuer}
                      </span>
                    </div>
                    <span className="text-sm font-semibold shrink-0" style={{ color: 'hsl(var(--accent))' }}>
                      Read review →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
