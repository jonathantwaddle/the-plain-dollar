import { useParams, Link } from 'wouter';
import { cardsBySlug } from '@/data';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { CardOfferBox } from '@/components/CardOfferBox';
import NotFound from './not-found';

export default function CardComparison() {
  const { slug } = useParams();
  
  // Parse slugs "card-a-vs-card-b"
  const parts = slug?.split('-vs-');
  if (!parts || parts.length !== 2) return <NotFound />;
  
  const cardA = cardsBySlug[parts[0]];
  const cardB = cardsBySlug[parts[1]];

  if (!cardA || !cardB) return <NotFound />;

  const hasAffiliate = cardA.apply_is_affiliate || cardB.apply_is_affiliate;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-8 md:py-14">
      {hasAffiliate && <AffiliateDisclosure />}
      
      <div className="mb-8">
        <Link href="/cards/" className="text-accent text-sm mb-4 inline-block">← Back to cards</Link>
        <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-4">
          {cardA.short_name} vs. {cardB.short_name}
        </h1>
        <p className="text-xl text-foreground/80">A plain English comparison to help you choose the right card.</p>
      </div>

      <div className="table-container mb-16">
        <table className="min-w-[600px]">
          <thead>
            <tr>
              <th className="w-1/4">Feature</th>
              <th className="w-[37.5%]">{cardA.short_name}</th>
              <th className="w-[37.5%]">{cardB.short_name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="bg-background">Annual fee</th>
              <td>{cardA.annual_fee === 0 ? "$0" : `$${cardA.annual_fee}`}</td>
              <td>{cardB.annual_fee === 0 ? "$0" : `$${cardB.annual_fee}`}</td>
            </tr>
            <tr>
              <th className="bg-background">Welcome offer</th>
              <td>{cardA.intro_offer ? cardA.intro_offer.headline : "None"}</td>
              <td>{cardB.intro_offer ? cardB.intro_offer.headline : "None"}</td>
            </tr>
            <tr>
              <th className="bg-background">Rewards</th>
              <td>
                <ul className="space-y-1">
                  {cardA.rewards.map((r, i) => <li key={i}><strong>{r.rate}</strong> {r.on}</li>)}
                </ul>
              </td>
              <td>
                <ul className="space-y-1">
                  {cardB.rewards.map((r, i) => <li key={i}><strong>{r.rate}</strong> {r.on}</li>)}
                </ul>
              </td>
            </tr>
            <tr>
              <th className="bg-background">Intro APR</th>
              <td>{cardA.intro_apr || "None"}</td>
              <td>{cardB.intro_apr || "None"}</td>
            </tr>
            <tr>
              <th className="bg-background">Regular APR</th>
              <td>{cardA.regular_apr}</td>
              <td>{cardB.regular_apr}</td>
            </tr>
            <tr>
              <th className="bg-background">Foreign transaction fee</th>
              <td>{cardA.foreign_transaction_fee}</td>
              <td>{cardB.foreign_transaction_fee}</td>
            </tr>
            <tr>
              <th className="bg-background">Recommended credit</th>
              <td>{cardA.recommended_credit}</td>
              <td>{cardB.recommended_credit}</td>
            </tr>
            <tr>
              <th className="bg-background">Our rating</th>
              <td className="font-bold text-lg">{cardA.rating.toFixed(1)} / 5.0</td>
              <td className="font-bold text-lg">{cardB.rating.toFixed(1)} / 5.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-primary mb-6">Card 1: {cardA.short_name}</h2>
          <CardOfferBox card={cardA} showReviewLink={true} as="h3" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-semibold text-primary mb-6">Card 2: {cardB.short_name}</h2>
          <CardOfferBox card={cardB} showReviewLink={true} as="h3" />
        </div>
      </div>

      <div className="bg-muted p-8 border border-border rounded">
        <h2 className="text-3xl font-serif font-semibold text-primary mb-4">The verdict</h2>
        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            Choosing between the {cardA.short_name} and the {cardB.short_name} comes down to how you spend your money and whether you are willing to pay an annual fee for higher earning rates.
          </p>
          <p>
            <strong>Choose the {cardA.short_name} if:</strong> {cardA.best_for[0]?.toLowerCase() || "it matches your spending better"}.
          </p>
          <p>
            <strong>Choose the {cardB.short_name} if:</strong> {cardB.best_for[0]?.toLowerCase() || "you prefer its reward structure"}.
          </p>
        </div>
      </div>
    </div>
  );
}
