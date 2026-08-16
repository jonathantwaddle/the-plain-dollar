/**
 * Sanity tests for the grocery card math.
 * Run: node scripts/grocery-math.test.mts (from artifacts/plain-dollar-mobile)
 */
import assert from 'node:assert/strict';
import { computeGroceryResults } from '../lib/groceryMath.ts';

const cards = [
  { slug: 'amex-blue-cash-preferred', short_name: 'Blue Cash Preferred', annual_fee: 95 },
  { slug: 'amex-blue-cash-everyday', short_name: 'Blue Cash Everyday', annual_fee: 0 },
  { slug: 'bank-of-america-customized-cash', short_name: 'Customized Cash', annual_fee: 0 },
  { slug: 'citi-double-cash', short_name: 'Double Cash', annual_fee: 0 },
  { slug: 'wells-fargo-active-cash', short_name: 'Active Cash', annual_fee: 0 },
  { slug: 'chase-freedom-unlimited', short_name: 'Freedom Unlimited', annual_fee: 0 },
  { slug: 'unknown-card', short_name: 'Unknown', annual_fee: 0 },
];

function net(results: ReturnType<typeof computeGroceryResults>, slug: string) {
  const r = results.find((x) => x.card.slug === slug);
  assert.ok(r, `missing result for ${slug}`);
  return Math.round(r.totalValue);
}

// --- Default spend: $500 groceries + $1,000 other per month --------------
{
  const results = computeGroceryResults(cards, 500, 1000);

  // Unknown cards without verified rules are excluded, not guessed at.
  assert.equal(results.length, 6);

  // Blue Cash Preferred: 6,000*6% + 12,000*1% - $95 = 360 + 120 - 95 = 385
  assert.equal(net(results, 'amex-blue-cash-preferred'), 385);
  // Blue Cash Everyday: 6,000*3% + 12,000*1% = 180 + 120 = 300 (NOT 540)
  assert.equal(net(results, 'amex-blue-cash-everyday'), 300);
  // Customized Cash: 6,000*2% + 12,000*1% = 120 + 120 = 240 (NOT 540)
  assert.equal(net(results, 'bank-of-america-customized-cash'), 240);
  // Flat 2% cards: 18,000*2% = 360
  assert.equal(net(results, 'citi-double-cash'), 360);
  assert.equal(net(results, 'wells-fargo-active-cash'), 360);
  // Freedom Unlimited: 18,000*1.5% = 270
  assert.equal(net(results, 'chase-freedom-unlimited'), 270);

  // Winner at default spend is Blue Cash Preferred.
  assert.equal(results[0].card.slug, 'amex-blue-cash-preferred');
}

// --- Cap boundary: $1,000/mo groceries exceeds the $6,000 BCP cap ---------
{
  const results = computeGroceryResults(cards, 1000, 1000);

  // BCP: 6,000*6% + 6,000*1% + 12,000*1% - 95 = 360 + 60 + 120 - 95 = 445
  assert.equal(net(results, 'amex-blue-cash-preferred'), 445);
  // Flat 2%: 24,000*2% = 480 — overtakes BCP once groceries blow past the cap.
  assert.equal(net(results, 'citi-double-cash'), 480);
  assert.equal(results[0].card.slug === 'citi-double-cash' || results[0].card.slug === 'wells-fargo-active-cash', true);
}

// --- Zero / negative input is clamped, never NaN ---------------------------
{
  const results = computeGroceryResults(cards, 0, -50);
  for (const r of results) {
    assert.ok(Number.isFinite(r.totalValue));
  }
}

console.log('grocery-math tests passed');
