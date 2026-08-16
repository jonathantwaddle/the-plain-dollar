import { Link } from 'wouter';
import { guides } from '@/data';

export default function GuidesHub() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 px-6 md:px-8 py-8 md:py-14">
      <section>
        <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">Guides</h1>
        <p className="text-xl text-foreground/90 leading-relaxed mb-8">
          Clear, step-by-step explanations of how the financial system works. No jargon, no filler.
        </p>
      </section>

      <div className="space-y-8">
        {guides.map(guide => (
          <article key={guide.slug} className="border-b border-border pb-8 last:border-0">
            <Link href={`/guides/${guide.slug}/`} className="group no-underline block">
              <h2 className="text-2xl font-serif font-semibold text-foreground group-hover:text-accent mb-3">
                {guide.title}
              </h2>
              <p className="text-lg text-foreground/80 mb-3">{guide.description}</p>
              <div className="text-sm text-foreground/60 font-medium">
                Published {guide.published}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
