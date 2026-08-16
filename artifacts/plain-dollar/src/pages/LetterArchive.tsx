import { useState } from 'react';
import { Link } from 'wouter';
import { letters } from '@/data';

export default function LetterArchive() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const sortedLetters = [...letters].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto space-y-12 px-6 md:px-8 py-8 md:py-14">
      <section>
        <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">The Letter</h1>
        <p className="text-xl text-foreground/90 leading-relaxed mb-8">
          One plain-English money tip each Tuesday. No pitch, no spam. Read past issues below.
        </p>
      </section>

      <section className="bg-muted p-8 border border-border rounded mb-12">
        <h2 className="text-2xl font-serif font-semibold mb-3">Subscribe to The Letter</h2>
        {subscribed ? (
          <p className="text-lg text-foreground" role="status" data-testid="subscribe-confirmation">
            You are on the list. The next issue arrives Tuesday morning.
          </p>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 mt-4" onSubmit={handleSubscribe} data-testid="subscribe-form">
            <label htmlFor="archive-email-input" className="sr-only">Email address</label>
            <input
              id="archive-email-input"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded text-lg focus:outline-none focus:ring-2 focus:ring-accent"
              data-testid="input-email-archive"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 border border-accent/20 min-h-[48px]"
              data-testid="button-subscribe-archive"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      <div className="space-y-8">
        {sortedLetters.map(issue => (
          <article key={issue.slug} className="border-b border-border pb-8 last:border-0">
            <Link href={`/letter/${issue.date}/`} className="group no-underline block">
              <div className="text-sm text-foreground/60 font-medium mb-2">{issue.date}</div>
              <h2 className="text-2xl font-serif font-semibold text-foreground group-hover:text-accent mb-3">
                {issue.subject}
              </h2>
              <p className="text-lg text-foreground/80">{issue.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
