import { ProductData } from '@/types';
import { RatingStars } from './RatingStars';
import { Link } from 'wouter';

export function ProductBox({
  product,
  showBuyLink = false,
  as: Component = 'h3',
}: {
  product: ProductData;
  showBuyLink?: boolean;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="border border-border rounded bg-card mb-8 shadow-sm overflow-hidden">
      <div className="bg-muted px-6 py-4 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Component className="text-2xl font-serif font-semibold text-primary mb-1">
            {product.name}
          </Component>
          <p className="text-sm" style={{ color: 'hsl(0 0% 40%)' }}>
            {product.brand} · {product.category}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <RatingStars rating={product.rating} />
          <Link href="/methodology/" className="text-sm mt-1" style={{ color: 'hsl(0 0% 40%)' }}>
            Our rating
          </Link>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">Price</h4>
            <p className="font-medium text-lg text-primary">{product.price.headline}</p>
            {product.price.upfront && <p>{product.price.upfront}</p>}
            {product.price.note && (
              <p className="text-sm mt-1" style={{ color: 'hsl(0 0% 45%)' }}>
                {product.price.note}
              </p>
            )}
          </section>

          <section>
            <h4 className="font-semibold text-foreground border-b border-border pb-1 mb-2">
              Key facts
            </h4>
            <table className="w-full text-left border-none">
              <tbody>
                {product.key_facts.map((fact, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0">
                    <th className="py-2 font-medium bg-transparent border-0 pr-4">{fact.label}</th>
                    <td className="py-2 border-0">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="space-y-6">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Pros</h4>
              <ul className="space-y-1">
                {product.pros.map((p, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-green-700 font-bold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Cons</h4>
              <ul className="space-y-1">
                {product.cons.map((c, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-amber-700 font-bold">✗</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-primary/5 p-4 rounded border border-primary/10">
            <h4 className="font-semibold text-primary mb-2">Best for</h4>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              {product.best_for.map((bf, i) => (
                <li key={i}>{bf}</li>
              ))}
            </ul>
            <h4 className="font-semibold text-amber-800 mb-1">Skip it if</h4>
            <p className="text-foreground">{product.skip_if}</p>
          </section>
        </div>
      </div>

      <div className="bg-muted px-6 py-5 border-t border-border space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex flex-col gap-1">
            <a
              href={product.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 border border-accent/20 min-h-[48px] flex items-center justify-center no-underline transition-colors"
              data-testid={`buy-link-${product.slug}`}
            >
              Go to {product.brand}'s site →
            </a>
            {product.buy_is_affiliate && (
              <span className="badge-affiliate self-start mt-1">Affiliate link</span>
            )}
          </div>
          {showBuyLink && (
            <Link
              href={`/${product.section}/${product.category}/${product.slug}/`}
              className="w-full md:w-auto text-center px-6 py-3 bg-background text-foreground font-medium rounded border border-border hover:bg-muted min-h-[48px] flex items-center justify-center no-underline"
            >
              Read our full review →
            </Link>
          )}
        </div>

        <p className="text-sm" style={{ color: 'hsl(0 0% 45%)' }}>
          This is {product.buy_is_affiliate ? 'an affiliate' : 'not an affiliate'} link. Our rating
          and the order products appear are not affected by whether we earn a commission.
        </p>

        <div
          className="border-t border-border/50 pt-4 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-2 text-sm"
          style={{ color: 'hsl(0 0% 45%)' }}
        >
          <p>
            Checked by hand on {product.verified_on} by {product.verified_by} (
            <a href={product.source_url} target="_blank" rel="noopener noreferrer">
              Source
            </a>
            )
          </p>
          <p className="font-medium text-foreground">
            Jon used this personally: {product.hands_on ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
}
