import { CardData } from '@/types';
import { Link } from 'wouter';
import { RatingStars } from './RatingStars';

export function CardOfferBox({
  card,
  showReviewLink = false,
  as: Component = 'h3',
}: {
  card: CardData;
  showReviewLink?: boolean;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="border border-border rounded bg-card mb-8 shadow-sm overflow-hidden">
      <div className="bg-muted px-6 py-4 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Component className="text-2xl font-serif font-semibold text-primary mb-1">
            {card.name}
          </Component>
          <p className="text-sm" style={{ color: 'hsl(0 0% 40%)' }}>
            {card.issuer} · {card.network}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <RatingStars rating={card.rating} />
          <Link href="/methodology/" className="text-sm mt-1" style={{ color: 'hsl(0 0% 40%)' }}>
            Our rating
          </Link>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
              Annual fee
            </h4>
            <p>{card.annual_fee === 0 ? '$0 per year' : `$${card.annual_fee} per year`}</p>
          </section>

          {card.intro_offer && (
            <section>
              <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
                Welcome offer
              </h4>
              <p className="font-medium text-lg text-primary">{card.intro_offer.headline}</p>
              <p>{card.intro_offer.spend_requirement}</p>
              {card.is_amex && (
                <p className="text-sm italic mt-2">
                  Welcome offers vary and you may not be eligible for this offer. Terms apply.
                </p>
              )}
            </section>
          )}

          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
              Rewards
            </h4>
            <ul className="space-y-2">
              {card.rewards.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold min-w-[3rem] text-right">{r.rate}</span>
                  <span>{r.on}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
              Rates
            </h4>
            {card.intro_apr && (
              <p className="mb-2">
                <strong>Intro APR:</strong> {card.intro_apr}
              </p>
            )}
            <p>
              <strong>Regular APR:</strong> {card.regular_apr}
            </p>
            <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 45%)' }}>
              (APR is the yearly interest rate if you carry a balance)
            </p>
          </section>

          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
              Key details
            </h4>
            <p className="mb-2">
              <strong>Foreign transaction fee:</strong> {card.foreign_transaction_fee}
            </p>
            <p>
              <strong>Recommended credit:</strong> {card.recommended_credit}
            </p>
          </section>

          <section className="bg-primary/5 p-4 rounded border border-primary/10">
            <h4 className="font-semibold text-primary mb-2">Best for</h4>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {card.best_for.map((bf, i) => (
                <li key={i}>{bf}</li>
              ))}
            </ul>
            <h4 className="font-semibold text-amber-800 mb-1">Skip it if</h4>
            <p className="text-foreground">{card.skip_if}</p>
          </section>
        </div>
      </div>

      <div className="bg-muted px-6 py-5 border-t border-border space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex flex-col gap-1">
            <a
              href={card.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 border border-accent/20 min-h-[48px] flex items-center justify-center no-underline transition-colors"
              data-testid={`apply-link-${card.slug}`}
            >
              Apply on {card.issuer}'s site →
            </a>
            {card.apply_is_affiliate && (
              <span className="badge-affiliate self-start mt-1">Affiliate link</span>
            )}
          </div>
          {showReviewLink && (
            <Link
              href={`/cards/reviews/${card.slug}/`}
              className="w-full md:w-auto text-center px-6 py-3 bg-background text-foreground font-medium rounded border border-border hover:bg-muted min-h-[48px] flex items-center justify-center no-underline"
            >
              Read our full review →
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm justify-between">
          <div>
            {card.rates_and_fees_url && (
              <a href={card.rates_and_fees_url} target="_blank" rel="noopener noreferrer" className="mr-4">
                Rates &amp; Fees
              </a>
            )}
          </div>
        </div>

        <p className="text-sm" style={{ color: 'hsl(0 0% 45%)' }}>
          This is {card.apply_is_affiliate ? 'an affiliate' : 'not an affiliate'} link. Our rating
          and the order cards appear are not affected by whether we earn a commission.
        </p>

        <div
          className="border-t border-border/50 pt-4 mt-2 text-sm"
          style={{ color: 'hsl(0 0% 45%)' }}
        >
          <p className="mb-2">
            Checked by hand on {card.verified_on} by {card.verified_by} (
            <a href={card.source_url} target="_blank" rel="noopener noreferrer">
              Source
            </a>
            )
          </p>

          {card.offer_history.length > 0 && (
            <details className="cursor-pointer group">
              <summary className="font-medium hover:text-foreground">Offer history</summary>
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-border/50">
                {card.offer_history.map((h, i) => (
                  <div key={i}>
                    <span className="font-medium" style={{ color: 'hsl(0 0% 35%)' }}>
                      {h.date}:
                    </span>{' '}
                    {h.headline}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
