import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { letters } from '@/data';
import NotFound from './not-found';

export default function LetterIssue() {
  const { date } = useParams();
  const issue = letters.find(l => l.date === date);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  if (!issue) return <NotFound />;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const paragraphs = issue.body.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <div className="mb-6">
        <Link href="/letter/" className="text-accent text-sm inline-block mb-2">← Back to archive</Link>
      </div>

      <div className="text-sm text-foreground/60 font-medium mb-4">{issue.date}</div>
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-12">{issue.subject}</h1>

      <div className="prose prose-lg max-w-none text-foreground mb-16">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="bg-primary/5 p-8 border border-primary/10 rounded">
        <h2 className="text-2xl font-serif font-semibold text-primary mb-3">Get the next issue in your inbox</h2>
        <p className="text-foreground/80 mb-6">One plain-English tip every Tuesday.</p>
        {subscribed ? (
          <p className="text-lg text-foreground" role="status" data-testid="subscribe-confirmation-issue">
            You are on the list. See you Tuesday.
          </p>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe} data-testid="subscribe-form-issue">
            <label htmlFor="issue-email-input" className="sr-only">Email address</label>
            <input
              id="issue-email-input"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              data-testid="input-email-issue"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 border border-accent/20 min-h-[48px]"
              data-testid="button-subscribe-issue"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
