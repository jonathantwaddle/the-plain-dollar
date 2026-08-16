import { useParams, Link } from 'wouter';
import { guides, cardsBySlug, productsBySlug } from '@/data';
import { PageByline } from '@/components/PageByline';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { CardOfferBox } from '@/components/CardOfferBox';
import { ProductBox } from '@/components/ProductBox';
import NotFound from './not-found';

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = guides.find(g => g.slug === slug);

  if (!guide) return <NotFound />;

  // Create simple paragraph blocks, handling bold tags basically
  const renderBody = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      // Very basic markdown bold parsing for **text**
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  const relatedCards = guide.related_cards.map(s => cardsBySlug[s]).filter(Boolean);
  const relatedProducts = guide.related_products.map(s => productsBySlug[s]).filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      {guide.has_affiliate_links && <AffiliateDisclosure />}
      
      <div className="mb-6">
        <Link href="/guides/" className="text-accent text-sm inline-block mb-2">← Back to guides</Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">{guide.title}</h1>
      
      <PageByline date={guide.reviewed_on} />
      
      <div className="prose prose-lg max-w-none text-foreground mb-16">
        {renderBody(guide.body)}
      </div>

      {guide.faq && guide.faq.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-semibold text-primary mb-8 pb-2 border-b border-border">Frequently asked questions</h2>
          <div className="space-y-6">
            {guide.faq.map((item, i) => (
              <details key={i} className="group bg-muted border border-border rounded p-6">
                <summary className="font-serif text-xl font-semibold cursor-pointer marker:text-accent flex items-center justify-between">
                  {item.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-lg text-foreground/90 leading-relaxed border-t border-border/50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {(relatedCards.length > 0 || relatedProducts.length > 0) && (
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-serif font-semibold text-primary mb-8">Related products</h2>
          
          <div className="space-y-12">
            {relatedCards.map(card => (
              <div key={card.slug}>
                <CardOfferBox card={card} showReviewLink={true} as="h3" />
              </div>
            ))}
            
            {relatedProducts.map(product => (
              <div key={product.slug}>
                <ProductBox product={product} showBuyLink={true} as="h3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
