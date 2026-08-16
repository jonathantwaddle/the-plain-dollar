import { useParams, Link, useLocation } from 'wouter';
import { allProducts } from '@/data';
import { ProductBox } from '@/components/ProductBox';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import NotFound from './not-found';

export default function CategoryPage() {
  const params = useParams<{ category?: string }>();
  const [location] = useLocation();

  // Routes are /protect/:category/, /plan/:category/, etc.
  // Derive the section from the first path segment since it's not a route param.
  const section = location.split('/').filter(Boolean)[0] ?? '';
  const category = params.category;

  if (!section || !category) return <NotFound />;

  const products = allProducts.filter(p => p.section === section && p.category === category);

  if (products.length === 0) return <NotFound />;

  const hasAffiliate = products.some(p => p.buy_is_affiliate);
  const title = category.replace(/-/g, ' ');

  return (
    <div>
      {/* ── Forest-green hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Link href={`/${section}/`} className="no-underline text-xs font-bold uppercase tracking-wider mb-4 inline-block" style={{ color: 'hsl(40 60% 62%)' }}>
            ← {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
          <h1
            className="font-serif font-bold mb-3 capitalize"
            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', lineHeight: 1.12, letterSpacing: '-0.015em', color: 'white' }}
          >
            {title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'hsl(140 20% 78%)' }}>
            {products.length} independent review{products.length !== 1 ? 's' : ''} — no sponsored placements
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {hasAffiliate && <AffiliateDisclosure />}

        <div className="prose prose-lg max-w-none text-foreground mb-10">
          <p>
            Our independent reviews of {title} products. We evaluate features, pricing, and company
            reputation to help you make an informed decision.
          </p>
        </div>

        <div className="space-y-16">
          {products.map(product => (
            <ProductBox key={product.slug} product={product} showBuyLink={true} as="h2" />
          ))}
        </div>
      </div>
    </div>
  );
}
