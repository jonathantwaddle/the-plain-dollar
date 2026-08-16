import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { allCards } from '@/data';

export default function GroceryCardMath() {
  const [grocerySpend, setGrocerySpend] = useState<number>(500);
  const [otherSpend, setOtherSpend] = useState<number>(1000);

  // Filter some known cards for grocery math or fallback to all if fewer.
  // The prompt mentions specific slugs, let's filter by them or fallback.
  const targetSlugs = ['wells-fargo-active-cash', 'citi-double-cash', 'amex-blue-cash-preferred', 'amex-blue-cash-everyday', 'bank-of-america-customized-cash', 'chase-freedom-unlimited'];
  
  const cards = useMemo(() => {
    let filtered = allCards.filter(c => targetSlugs.includes(c.slug));
    if (filtered.length === 0) {
      filtered = allCards.filter(c => c.tags.includes('cash-back'));
    }
    return filtered;
  }, []);

  const results = useMemo(() => {
    return cards.map(card => {
      let groceryEarnings = 0;
      let otherEarnings = 0;
      let fee = card.annual_fee;

      // Extremely simplified reward calculation
      // Amex BCP has a $6000 cap on 6%
      const annualGrocery = grocerySpend * 12;
      const annualOther = otherSpend * 12;

      if (card.slug === 'amex-blue-cash-preferred') {
        const highEarn = Math.min(annualGrocery, 6000) * 0.06;
        const lowEarn = Math.max(annualGrocery - 6000, 0) * 0.01;
        groceryEarnings = highEarn + lowEarn;
        otherEarnings = annualOther * 0.01;
      } else if (card.slug === 'citi-double-cash' || card.slug === 'wells-fargo-active-cash') {
        groceryEarnings = annualGrocery * 0.02;
        otherEarnings = annualOther * 0.02;
      } else if (card.slug === 'chase-freedom-unlimited') {
        groceryEarnings = annualGrocery * 0.015;
        otherEarnings = annualOther * 0.015;
      } else {
        // Fallback for others
        const rateStr = card.rewards[0]?.rate || '1%';
        const rate = parseFloat(rateStr) / 100 || 0.01;
        groceryEarnings = annualGrocery * rate;
        otherEarnings = annualOther * rate;
      }

      const totalValue = groceryEarnings + otherEarnings - fee;

      return {
        card,
        groceryEarnings,
        otherEarnings,
        fee,
        totalValue
      };
    }).sort((a, b) => b.totalValue - a.totalValue);
  }, [cards, grocerySpend, otherSpend]);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/tools/" className="text-accent text-sm inline-block mb-2">← Back to tools</Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">Grocery card math</h1>
      
      <p className="text-xl text-foreground/80 mb-10 max-w-2xl">
        Compare the top grocery credit cards based on your actual monthly supermarket spending. We deduct the annual fee so you see net earnings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-muted p-6 border border-border rounded">
          <label htmlFor="grocerySpend" className="block font-semibold mb-2 text-foreground">Monthly grocery spend ($)</label>
          <input 
            id="grocerySpend" 
            type="number" 
            min="0" 
            value={grocerySpend || ''} 
            onChange={e => setGrocerySpend(Number(e.target.value))}
            className="w-full px-4 py-3 border border-border rounded bg-background text-lg"
          />
        </div>
        <div className="bg-muted p-6 border border-border rounded">
          <label htmlFor="otherSpend" className="block font-semibold mb-2 text-foreground">Monthly other spend ($)</label>
          <input 
            id="otherSpend" 
            type="number" 
            min="0" 
            value={otherSpend || ''} 
            onChange={e => setOtherSpend(Number(e.target.value))}
            className="w-full px-4 py-3 border border-border rounded bg-background text-lg"
          />
        </div>
      </div>

      <div aria-live="polite" className="table-container">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Card</th>
              <th className="text-right">Annual rewards</th>
              <th className="text-right">Annual fee</th>
              <th className="text-right">Net value</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.card.slug} className={i === 0 ? "bg-green-50 border-green-200 border-2" : ""}>
                <td className="font-medium">
                  {r.card.short_name}
                  {i === 0 && <span className="ml-2 text-xs bg-green-200 text-green-900 px-2 py-1 rounded font-bold uppercase tracking-wider">Winner</span>}
                </td>
                <td className="text-right">${(r.groceryEarnings + r.otherEarnings).toFixed(0)}</td>
                <td className="text-right text-foreground/70">${r.fee}</td>
                <td className="text-right font-bold text-lg">${r.totalValue.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
