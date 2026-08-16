import { useParams, Link, useLocation } from 'wouter';
import { cardsBySlug, allCards } from '@/data';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { PageByline } from '@/components/PageByline';
import { CardOfferBox } from '@/components/CardOfferBox';
import { AdSlot } from '@/components/AdSlot';
import NotFound from './not-found';

export default function CardReview() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  const card = slug ? cardsBySlug[slug] : undefined;

  if (!card) return <NotFound />;

  const otherCards = allCards.filter(c => c.slug !== card.slug);

  function handleCompareSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      navigate(`/cards/compare/${card!.slug}-vs-${selectedSlug}/`);
    }
  }

  const alternatives = allCards
    .filter(c => c.slug !== card.slug && c.tags.some(t => card.tags.includes(t)))
    .slice(0, 3);

  return (
    <div>
      {/* ── Navy hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14">
          {card.apply_is_affiliate && (
            <p className="text-xs mb-3" style={{ color: 'hsl(40 60% 62%)' }}>
              Affiliate link disclosure — see below
            </p>
          )}
          <span className="eyebrow mb-3">Card Review · The Plain Dollar</span>
          <h1
            className="font-serif font-bold mb-3"
            style={{
              fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.015em',
              color: 'white',
            }}
          >
            {card.name} Review
          </h1>
          <p className="text-sm mt-2" style={{ color: 'hsl(210 20% 58%)' }}>
            By <strong style={{ color: 'hsl(210 20% 72%)' }}>Jon Twaddle</strong> · Checked by hand on {card.verified_on}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {card.apply_is_affiliate && <AffiliateDisclosure />}

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 items-start">
          {/* Main column */}
          <div>
            <div className="mb-10">
              <CardOfferBox card={card} showReviewLink={false} as="h2" />
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4 pb-2 border-b border-border">
                Our verdict
              </h2>
              <div className="prose prose-lg max-w-none text-foreground">
                <p>{card.rating_reason}</p>
                <p>
                  When we review cards like the {card.short_name}, we look past the marketing to see
                  how it performs for regular people. The annual fee of{' '}
                  {card.annual_fee === 0 ? '$0' : `$${card.annual_fee}`} means you need to ensure the
                  rewards you earn outweigh the cost. If you carry a balance, the regular APR of{' '}
                  {card.regular_apr} will wipe out any rewards you earn, so always pay in full if you can.
                </p>
              </div>
            </div>

            {/* Compare selector */}
            <div className="mb-10 p-5 bg-white border border-border rounded-xl" style={{ boxShadow: 'var(--shadow-xs)' }} data-testid="compare-selector">
              <h2 className="text-base font-bold text-primary mb-3">Compare with another card</h2>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <select
                  defaultValue=""
                  onChange={handleCompareSelect}
                  className="flex-1 border border-border rounded-lg px-3 py-2.5 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Select a card to compare"
                >
                  <option value="" disabled>Select a card…</option>
                  {otherCards.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <span className="text-sm text-muted-foreground hidden sm:block shrink-0">vs. {card.short_name}</span>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-4 mt-6 lg:mt-0" data-testid="card-sidebar">
            <div className="bg-white rounded-xl p-5 border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <h2 className="text-base font-bold mb-3" style={{ color: 'hsl(142 50% 28%)' }}>Get it if</h2>
              <ul className="space-y-2">
                {card.best_for.map((bf, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: 'hsl(142 30% 22%)' }}>
                    <span className="shrink-0 mt-0.5" style={{ color: 'hsl(142 50% 38%)' }}>✓</span>
                    {bf}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <h2 className="text-base font-bold mb-3" style={{ color: 'hsl(40 54% 36%)' }}>Skip it if</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(40 20% 28%)' }}>{card.skip_if}</p>
            </div>
            <AdSlot variant="sidebar" />
          </aside>
        </div>

        {alternatives.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Alternatives to consider</h2>
            <div className="space-y-3">
              {alternatives.map(alt => (
                <div
                  key={alt.slug}
                  className="p-4 bg-white border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ boxShadow: 'var(--shadow-xs)' }}
                >
                  <div>
                    <h3 className="font-bold text-base">{alt.short_name}</h3>
                    <p className="text-sm" style={{ color: 'hsl(0 0% 44%)' }}>{alt.rating_reason.substring(0, 80)}…</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/cards/compare/${card.slug}-vs-${alt.slug}/`}
                      className="border border-border bg-muted px-4 py-2 rounded-lg text-sm font-semibold no-underline hover:bg-border transition-colors"
                      style={{ color: 'hsl(var(--primary))' }}
                      data-testid={`link-compare-${alt.slug}`}
                    >
                      Compare
                    </Link>
                    <Link
                      href={`/cards/reviews/${alt.slug}/`}
                      className="btn-gold text-sm px-4 py-2"
                      style={{ minHeight: '38px' }}
                      data-testid={`link-review-${alt.slug}`}
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
