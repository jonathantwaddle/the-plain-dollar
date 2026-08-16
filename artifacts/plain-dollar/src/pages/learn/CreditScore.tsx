import { Link } from 'wouter';

const factors = [
  {
    num: '01',
    pct: '35%',
    name: 'Payment history',
    desc: 'The most important factor. Pay every bill on time, every month. One late payment can knock 50 to 100 points off a good score.',
  },
  {
    num: '02',
    pct: '30%',
    name: 'Amounts owed (credit utilization)',
    desc: 'Use less than 30% of your available credit at any time. If your credit limit is $10,000, keep your balance below $3,000. Lower is better.',
  },
  {
    num: '03',
    pct: '15%',
    name: 'Length of credit history',
    desc: 'Older accounts help your score. Keep your oldest card open, even if you rarely use it. Closing old accounts shortens your history.',
  },
  {
    num: '04',
    pct: '10%',
    name: 'Credit mix',
    desc: 'Having both a credit card and an installment loan (like a car loan or student loan) helps a little. You do not need to take out a loan just for this.',
  },
  {
    num: '05',
    pct: '10%',
    name: 'New credit',
    desc: 'Each new application causes a small, temporary dip called a hard inquiry. Space out applications by at least six months.',
  },
];

const scoreRanges = [
  { range: 'Exceptional', scores: '800–850', note: 'Best rates on everything' },
  { range: 'Very good', scores: '740–799', note: 'Near-best rates' },
  { range: 'Good', scores: '670–739', note: 'Most cards and loans available' },
  { range: 'Fair', scores: '580–669', note: 'Limited options, higher rates' },
  { range: 'Poor', scores: 'Below 580', note: 'Secured cards or credit-builder loans' },
];

export default function CreditScore() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/learn/" className="text-sm" style={{ color: '#0057b8' }}>
          ← Back to Learn
        </Link>
      </div>

      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
        Learn · Credit scores
      </p>
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
        How your credit score works
      </h1>
      <p className="text-sm mb-10" style={{ color: 'hsl(0 0% 50%)' }}>
        By Jon Twaddle · Updated August 2026 · 5 min read
      </p>

      <div className="prose prose-lg max-w-none text-foreground mb-12">
        <p>
          Your credit score is a number between 300 and 850. Lenders use it to decide whether to
          approve you for a credit card, mortgage, or car loan — and at what interest rate. The
          higher the number, the better your terms.
        </p>
        <p>
          The most widely used scoring model in the US is FICO 8. Your score is calculated from
          information in your credit reports, which are maintained by three companies: Equifax,
          Experian, and TransUnion. You can check your credit report for free at
          AnnualCreditReport.com.
        </p>
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary mb-8">The five factors</h2>
      <div className="space-y-5 mb-14">
        {factors.map(f => (
          <div
            key={f.num}
            className="border border-border rounded bg-card p-6 flex gap-5 items-start"
            data-testid={`factor-${f.num}`}
          >
            <div className="shrink-0 text-center w-14">
              <div
                className="text-3xl font-serif font-bold leading-none mb-1"
                style={{ color: 'hsl(117 24% 15% / 0.2)' }}
              >
                {f.num}
              </div>
              <div className="text-sm font-bold" style={{ color: 'hsl(40 54% 50%)' }}>
                {f.pct}
              </div>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-primary text-lg mb-2">{f.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(0 0% 35%)' }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary mb-6">
        What counts as a good score?
      </h2>
      <div className="table-container mb-12">
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Score range</th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            {scoreRanges.map(r => (
              <tr key={r.range}>
                <td className="font-medium">{r.range}</td>
                <td>{r.scores}</td>
                <td style={{ color: 'hsl(0 0% 40%)' }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-muted border border-border rounded p-6 mb-12">
        <h3 className="font-serif font-semibold text-primary text-xl mb-3">The bottom line</h3>
        <p style={{ color: 'hsl(0 0% 35%)' }}>
          Pay on time. Keep your balances low. Do not close old accounts. Do not apply for credit
          more than once or twice a year. Those four habits will get you to a good score and keep
          you there.
        </p>
      </div>

      <div className="border-t border-border pt-8">
        <p
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'hsl(0 0% 55%)' }}
        >
          Related
        </p>
        <Link href="/cards/best/no-annual-fee/" className="text-xl font-serif font-semibold" style={{ color: '#0057b8' }}>
          Best no-annual-fee cards — a good starting point →
        </Link>
      </div>
    </div>
  );
}
