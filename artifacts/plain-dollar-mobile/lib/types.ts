export interface IntroOffer {
  headline: string;
  spend_requirement: string;
  expires: string | null;
  our_value_estimate: string;
}

export interface Reward { rate: string; on: string; }

export interface OfferHistory { date: string; headline: string; }

export interface CardData {
  slug: string;
  name: string;
  short_name: string;
  issuer: string;
  network: string;
  is_amex: boolean;
  annual_fee: number;
  intro_offer: IntroOffer | null;
  rewards: Reward[];
  regular_apr: string;
  intro_apr: string | null;
  foreign_transaction_fee: string;
  recommended_credit: string;
  rating: number;
  rating_reason: string;
  best_for: string[];
  skip_if: string;
  tags: string[];
  apply_url: string;
  apply_is_affiliate: boolean;
  rates_and_fees_url: string | null;
  verified_on: string;
  verified_by: string;
  source_url: string;
  offer_history: OfferHistory[];
  phone: string;
}

export interface PriceData { headline: string; upfront: string | null; note: string | null; }

export interface KeyFact { label: string; value: string; }

export interface ProductData {
  slug: string;
  name: string;
  brand: string;
  section: 'protect' | 'plan' | 'save' | 'health';
  category: string;
  price: PriceData;
  key_facts: KeyFact[];
  pros: string[];
  cons: string[];
  best_for: string[];
  skip_if: string;
  rating: number;
  rating_reason: string;
  buy_url: string;
  buy_is_affiliate: boolean;
  phone: string | null;
  hands_on: boolean;
  verified_on: string;
  verified_by: string;
  source_url: string;
}

export interface BestOfPick { card?: string; product?: string; best_for: string; why: string; }

export interface BestOfList {
  slug: string;
  title: string;
  audience_line: string;
  kind: 'cards' | 'products';
  has_affiliate_links: boolean;
  intro: string;
  verified_on: string;
  verified_by: string;
  picks: BestOfPick[];
}

export interface GuideFaq { q: string; a: string; }

export interface GuideData {
  slug: string;
  title: string;
  description: string;
  author: string;
  published: string;
  updated: string;
  reviewed_on: string;
  reviewed_by: string;
  section: string;
  has_affiliate_links: boolean;
  related_cards: string[];
  related_products: string[];
  body: string;
  faq: GuideFaq[];
}

export interface GlossaryTerm { term: string; definition: string; }

export interface LetterIssue {
  date: string;
  slug: string;
  subject: string;
  summary: string;
  body: string;
}
