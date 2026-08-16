/**
 * Grocery card math — explicit, per-card reward rules.
 *
 * Rates and caps are transcribed from each card's published terms (see the
 * matching JSON review in data/cards/). We only compare cards whose grocery
 * rules we have verified, rather than inferring rates from marketing strings.
 */

export interface GroceryRule {
  /** Rate on grocery spending up to the cap. */
  groceryRate: number;
  /** Annual grocery spend cap for the boosted rate, or null when uncapped. */
  groceryCapAnnual: number | null;
  /** Rate on grocery spending above the cap. */
  postCapRate: number;
  /** Rate on all other spending. */
  otherRate: number;
}

export const GROCERY_RULES: Record<string, GroceryRule> = {
  // 6% at US supermarkets up to $6,000/year, then 1%; 1% everywhere else.
  'amex-blue-cash-preferred': {
    groceryRate: 0.06,
    groceryCapAnnual: 6000,
    postCapRate: 0.01,
    otherRate: 0.01,
  },
  // 3% at US supermarkets up to $6,000/year, then 1%; 1% everywhere else.
  'amex-blue-cash-everyday': {
    groceryRate: 0.03,
    groceryCapAnnual: 6000,
    postCapRate: 0.01,
    otherRate: 0.01,
  },
  // 2% at grocery stores up to $2,500/quarter (combined with choice
  // category), then 1%; 1% everywhere else. $2,500 x 4 = $10,000/year.
  'bank-of-america-customized-cash': {
    groceryRate: 0.02,
    groceryCapAnnual: 10000,
    postCapRate: 0.01,
    otherRate: 0.01,
  },
  // Flat 2% (1% when you buy + 1% when you pay).
  'citi-double-cash': {
    groceryRate: 0.02,
    groceryCapAnnual: null,
    postCapRate: 0.02,
    otherRate: 0.02,
  },
  // Flat 2% cash rewards.
  'wells-fargo-active-cash': {
    groceryRate: 0.02,
    groceryCapAnnual: null,
    postCapRate: 0.02,
    otherRate: 0.02,
  },
  // Flat 1.5% base rate on everyday (non-bonus) spending.
  'chase-freedom-unlimited': {
    groceryRate: 0.015,
    groceryCapAnnual: null,
    postCapRate: 0.015,
    otherRate: 0.015,
  },
};

export interface GroceryCardInput {
  slug: string;
  short_name: string;
  annual_fee: number;
}

export interface GroceryResult<T extends GroceryCardInput> {
  card: T;
  rewards: number;
  fee: number;
  totalValue: number;
}

export function computeGroceryResults<T extends GroceryCardInput>(
  cards: T[],
  monthlyGrocery: number,
  monthlyOther: number,
): GroceryResult<T>[] {
  const annualGrocery = Math.max(monthlyGrocery, 0) * 12;
  const annualOther = Math.max(monthlyOther, 0) * 12;

  return cards
    .filter((card) => GROCERY_RULES[card.slug] !== undefined)
    .map((card) => {
      const rule = GROCERY_RULES[card.slug];
      const cap = rule.groceryCapAnnual ?? Infinity;
      const boosted = Math.min(annualGrocery, cap) * rule.groceryRate;
      const overflow = Math.max(annualGrocery - cap, 0) * rule.postCapRate;
      const other = annualOther * rule.otherRate;
      const rewards = boosted + overflow + other;
      return {
        card,
        rewards,
        fee: card.annual_fee,
        totalValue: rewards - card.annual_fee,
      };
    })
    .sort((a, b) => b.totalValue - a.totalValue);
}
