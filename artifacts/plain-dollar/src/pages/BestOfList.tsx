import { useParams, Link } from 'wouter';
import { bestOfLists, cardsBySlug } from '@/data';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { PageByline } from '@/components/PageByline';
import { CardOfferBox } from '@/components/CardOfferBox';
import { AdSlot } from '@/components/AdSlot';
import NotFound from './not-found';

export default function BestOfList() {
  const { slug } = useParams();
  const list = bestOfLists.find(l => l.slug === slug);

  if (!list || list.kind !== 'cards') return <NotFound />;

  const validPicks = list.picks.filter(p => p.card && cardsBySlug[p.card]);

  return (
    <div>
      {/* ── Navy hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Link href="/cards/" className="no-underline text-xs font-bold uppercase tracking-wider mb-4 inline-block" style={{ color: 'hsl(40 60% 62%)' }}>
            ← Credit Cards
          </Link>
          <span className="eyebrow mb-3">Best-of List · The Plain Dollar</span>
          <h1
            className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', lineHeight: 1.12, letterSpacing: '-0.015em', color: 'white' }}
          >
            {list.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'hsl(210 25% 72%)' }}>{list.audience_line}</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {list.has_affiliate_links && <AffiliateDisclosure />}

        <PageByline date={list.verified_on} />

        <div className="prose prose-lg max-w-none text-foreground mb-10 mt-4">
          <p>{list.intro}</p>
        </div>

        {/* Summary table */}
        <h2 className="text-xl font-serif font-bold text-primary mb-4">Summary comparison</h2>
        <div className="table-container mb-12">
          <table>
            <thead>
              <tr>
                <th className="min-w-[200px]">Card</th>
                <th>Annual fee</th>
                <th>Key reward rate</th>
                <th>Our rating</th>
              </tr>
            </thead>
            <tbody>
              {validPicks.map((pick, i) => {
                const card = cardsBySlug[pick.card!];
                return (
                  <tr key={i}>
                    <td className="font-semibold">
                      <a href={`#card-${card.slug}`} className="no-underline hover:underline" style={{ color: 'hsl(var(--primary))' }}>
                        {card.short_name}
                      </a>
                    </td>
                    <td>{card.annual_fee === 0 ? '$0' : `$${card.annual_fee}`}</td>
                    <td>{card.rewards[0]?.rate ?? 'Varies'}</td>
                    <td>{card.rating.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Card entries */}
        <div className="space-y-16">
          {validPicks.map((pick, i) => {
            const card = cardsBySlug[pick.card!];
            const nextPick = validPicks[i + 1];
            const nextCard = nextPick ? cardsBySlug[nextPick.card!] : null;
            return (
              <div key={i} id={`card-${card.slug}`} className="scroll-mt-24">
                <h2 className="text-xl font-serif font-bold text-primary mb-2">{pick.best_for}</h2>
                <div className="mb-6 p-4 bg-white border border-border rounded-xl text-base" style={{ boxShadow: 'var(--shadow-xs)' }}>
                  <strong>Why it made this list:</strong> {pick.why}
                </div>
                <CardOfferBox card={card} showReviewLink={true} as="h3" />
                {i === 0 && (
                  <div className="flex justify-center my-8" data-testid="inline-ad-slot">
                    <AdSlot variant="inline" />
                  </div>
                )}
                {nextCard && (
                  <div className="mt-6 flex justify-center">
                    <Link
                      href={`/cards/compare/${card.slug}-vs-${nextCard.slug}/`}
                      className="inline-flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-lg text-sm font-semibold no-underline hover:border-primary transition-colors"
                      style={{ color: 'hsl(var(--primary))' }}
                      data-testid={`link-compare-${card.slug}-vs-${nextCard.slug}`}
                    >
                      Compare {card.short_name} vs. {nextCard.short_name} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
