import React, { useState } from 'react';
import { Link } from 'wouter';

export default function AnnualFeeBreakeven() {
  const [fee, setFee] = useState<number>(95);
  const [rate, setRate] = useState<number>(2);
  const [noFeeRate, setNoFeeRate] = useState<number>(1.5);

  const calculateBreakEven = (annualFee: number, cardRate: number, comparisonRate: number) => {
    // When rate is 0 or negative, you can never earn enough to cover the fee
    const basicBreakEven = cardRate > 0 ? annualFee / (cardRate / 100) : Infinity;

    // Break even vs a no-fee card (incremental value)
    const incrementalRate = (cardRate - comparisonRate) / 100;
    const vsNoFeeBreakEven = incrementalRate > 0 ? annualFee / incrementalRate : Infinity;

    return { basic: basicBreakEven, vsNoFee: vsNoFeeBreakEven, incrementalRate };
  };

  const result = calculateBreakEven(fee, rate, noFeeRate);

  const formatCurrency = (val: number) => {
    if (val === Infinity) return "Impossible (rate is too low)";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/tools/" className="text-accent text-sm inline-block mb-2">← Back to tools</Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">Annual fee break-even calculator</h1>
      
      <p className="text-xl text-foreground/80 mb-10">
        Find out exactly how much you need to spend on a card for the annual fee to pay for itself.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="fee" className="block font-semibold mb-2 text-foreground">Annual fee ($)</label>
            <input 
              id="fee" 
              type="number" 
              min="0" 
              value={fee || ''} 
              onChange={e => setFee(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded bg-background text-lg"
            />
          </div>
          <div>
            <label htmlFor="rate" className="block font-semibold mb-2 text-foreground">This card's rewards rate (%)</label>
            <input 
              id="rate" 
              type="number" 
              min="0" 
              step="0.1"
              value={rate || ''} 
              onChange={e => setRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded bg-background text-lg"
            />
          </div>
          <div className="pt-4 border-t border-border">
            <label htmlFor="noFeeRate" className="block font-semibold mb-2 text-foreground">
              [Optional] Your no-fee card's rate (%)
            </label>
            <p className="text-sm text-foreground/70 mb-2">If you already have a card that earns rewards for free, compare against it.</p>
            <input 
              id="noFeeRate" 
              type="number" 
              min="0" 
              step="0.1"
              value={noFeeRate || ''} 
              onChange={e => setNoFeeRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded bg-background text-lg"
            />
          </div>
        </div>

        <div>
          <div className="bg-muted p-8 rounded border border-border h-full flex flex-col justify-center" aria-live="polite">
            <h2 className="text-2xl font-serif font-semibold mb-6 border-b border-border pb-4">The math</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-foreground/80 mb-2">To offset the fee entirely:</p>
                <p className="text-2xl font-semibold text-primary">
                  You need to spend <span className="underline decoration-accent/30">{formatCurrency(result.basic)}</span> per year.
                </p>
              </div>

              {noFeeRate > 0 && (
                <div className="pt-6 border-t border-border">
                  <p className="text-foreground/80 mb-2">Compared to a {noFeeRate}% no-fee card:</p>
                  {result.incrementalRate > 0 ? (
                    <p className="text-xl font-medium text-foreground">
                      You need to spend <span className="underline decoration-accent/30">{formatCurrency(result.vsNoFee)}</span> per year to come out ahead.
                    </p>
                  ) : (
                    <p className="text-xl font-medium text-amber-800">
                      This card earns less than your no-fee card. You will never come out ahead.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
