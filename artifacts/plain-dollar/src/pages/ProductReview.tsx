import { useParams, Link } from 'wouter';
import { productsBySlug, allProducts } from '@/data';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { PageByline } from '@/components/PageByline';
import { ProductBox } from '@/components/ProductBox';
import { AdSlot } from '@/components/AdSlot';
import NotFound from './not-found';

export default function ProductReview() {
  const { slug } = useParams();
  const product = slug ? productsBySlug[slug] : undefined;

  if (!product) return <NotFound />;

  const alternatives = allProducts
    .filter(
      p =>
        p.section === product.section &&
        p.category === product.category &&
        p.slug !== product.slug,
    )
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link
          href={`/${product.section}/${product.category}/`}
          className="text-sm capitalize"
          style={{ color: '#0057b8' }}
        >
          ← Back to {product.category.replace(/-/g, ' ')}
        </Link>
      </div>

      {product.buy_is_affiliate && <AffiliateDisclosure />}

      <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
        {product.name} Review
      </h1>
      <PageByline date={product.verified_on} />

      {/* Two-column layout on large screens */}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 items-start mt-6">
        {/* Main column */}
        <div>
          <div className="mb-10">
            <ProductBox product={product} showBuyLink={false} as="h2" />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4 pb-2 border-b border-border">
              Our verdict
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              <p>{product.rating_reason}</p>
              <p>
                When evaluating {product.category.replace(/-/g, ' ')} products, we focus on what
                matters most: reliable coverage, clear pricing, and responsive customer service. The{' '}
                {product.brand} offering is a solid choice if you fit their target demographic.
                Always read the fine print before signing a long-term contract.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-8 space-y-5 mt-6 lg:mt-0" data-testid="product-sidebar">
          {product.best_for.length > 0 && (
            <div className="bg-green-50 p-5 rounded border border-green-200">
              <h2 className="text-xl font-serif font-semibold text-green-900 mb-3">Best for</h2>
              <ul className="list-disc pl-5 space-y-2 text-green-950 text-sm">
                {product.best_for.map((bf, i) => (
                  <li key={i}>{bf}</li>
                ))}
              </ul>
            </div>
          )}
          {product.skip_if && (
            <div className="bg-amber-50 p-5 rounded border border-amber-200">
              <h2 className="text-xl font-serif font-semibold text-amber-900 mb-3">Skip it if</h2>
              <p className="text-amber-950 text-sm leading-relaxed">{product.skip_if}</p>
            </div>
          )}
          <AdSlot variant="sidebar" />
        </aside>
      </div>

      {alternatives.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
            Alternatives to consider
          </h2>
          <div className="space-y-4">
            {alternatives.map(alt => (
              <div
                key={alt.slug}
                className="p-4 border border-border rounded bg-muted flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{alt.name}</h3>
                  <p style={{ color: 'hsl(0 0% 40%)' }}>{alt.rating_reason.substring(0, 80)}…</p>
                </div>
                <Link
                  href={`/${alt.section}/${alt.category}/${alt.slug}/`}
                  className="btn-gold text-sm px-4 py-2 shrink-0 whitespace-nowrap"
                  style={{ minHeight: '40px' }}
                  data-testid={`link-alt-${alt.slug}`}
                >
                  Read review
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
