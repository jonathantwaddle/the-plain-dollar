import { Link } from 'wouter';

const accounts = [
  {
    type: 'Traditional savings',
    apy: '0.01–0.06%',
    access: 'Branch or ATM',
    bestFor: 'People who need a branch',
  },
  {
    type: 'Online high-yield savings',
    apy: '4–5%+',
    access: 'Online transfer (1–3 days)',
    bestFor: 'Emergency fund, short-term savings',
  },
  {
    type: 'Certificate of deposit (CD)',
    apy: '4–5% (fixed)',
    access: 'Locked until maturity',
    bestFor: 'Money you will not need for 6–24 months',
  },
];

export default function BankingBasics() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/learn/" className="text-sm" style={{ color: '#0057b8' }}>
          ← Back to Learn
        </Link>
      </div>

      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
        Learn · Banking
      </p>
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-bold mb-4">
        Banking basics
      </h1>
      <p className="text-lg font-serif text-primary/70 mb-4">
        Checking, savings, and high-yield accounts
      </p>
      <p className="text-sm mb-10" style={{ color: 'hsl(0 0% 50%)' }}>
        By Jon Twaddle · Updated August 2026 · 4 min read
      </p>

      <div className="prose prose-lg max-w-none text-foreground mb-12">
        <p>
          Most Americans have two bank accounts: a checking account for everyday spending and a
          savings account for money they want to keep. The problem is that most savings accounts at
          traditional banks pay almost nothing in interest — often 0.01% to 0.06% per year.
        </p>
        <p>
          Online banks have changed this. Because they do not pay for physical branches, they pass
          the savings on to depositors. Today, the best high-yield savings accounts pay 4% to 5%
          per year or more.
        </p>
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary mb-6">
        Account types compared
      </h2>
      <div className="table-container mb-12">
        <table>
          <thead>
            <tr>
              <th>Account type</th>
              <th>Typical APY</th>
              <th>Access</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a.type}>
                <td className="font-medium">{a.type}</td>
                <td>{a.apy}</td>
                <td>{a.access}</td>
                <td style={{ color: 'hsl(0 0% 40%)' }}>{a.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-border rounded bg-primary/5 p-6 mb-12">
        <h3 className="font-serif font-semibold text-primary text-xl mb-4">The math</h3>
        <p className="mb-2" style={{ color: 'hsl(0 0% 35%)' }}>
          If you keep $10,000 in a traditional savings account for a year at 0.06% APY, you earn{' '}
          <strong>$6</strong>.
        </p>
        <p className="mb-2" style={{ color: 'hsl(0 0% 35%)' }}>
          In a high-yield savings account at 4.5% APY, you earn <strong>$450</strong>.
        </p>
        <p style={{ color: 'hsl(0 0% 35%)' }}>
          That is $444 you are leaving on the table every year for no good reason.
        </p>
      </div>

      <h2 className="text-3xl font-serif font-semibold text-primary mb-6">What is APY?</h2>
      <div className="prose prose-lg max-w-none text-foreground mb-12">
        <p>
          APY stands for Annual Percentage Yield. It is the effective yearly return on your deposit,
          including the effect of compounding interest. When comparing savings accounts, always
          compare APY — not the nominal interest rate.
        </p>
        <p>
          Your money in a savings account is FDIC insured up to $250,000 per bank. This means if
          the bank fails, the federal government guarantees you get your money back up to that
          limit. Online banks are FDIC insured just like traditional banks.
        </p>
      </div>

      <div className="border-t border-border pt-8">
        <p
          className="text-sm font-semibold uppercase tracking-wider mb-4"
          style={{ color: 'hsl(0 0% 55%)' }}
        >
          Related
        </p>
        <Link href="/save/savings/" className="text-xl font-serif font-semibold" style={{ color: '#0057b8' }}>
          High-yield savings accounts we cover →
        </Link>
      </div>
    </div>
  );
}
