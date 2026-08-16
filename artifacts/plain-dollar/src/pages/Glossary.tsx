import { glossary } from '@/data';

export default function Glossary() {
  // Sort terms alphabetically
  const sortedTerms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  
  // Group by first letter
  const grouped: Record<string, typeof sortedTerms> = {};
  sortedTerms.forEach(item => {
    const letter = item.term.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(item);
  });

  const letters = Object.keys(grouped).sort();

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-14">
      <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">Glossary</h1>
      <p className="text-xl text-foreground/90 leading-relaxed mb-12">
        Financial terms explained in plain English. No jargon.
      </p>

      <div className="flex flex-wrap gap-2 mb-12 bg-muted p-4 rounded border border-border">
        {letters.map(letter => (
          <a 
            key={letter} 
            href={`#letter-${letter}`}
            className="w-10 h-10 flex items-center justify-center font-medium bg-background border border-border rounded hover:border-accent hover:text-accent no-underline"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {letters.map(letter => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-8">
            <h2 className="text-4xl font-serif font-semibold text-primary mb-6 pb-2 border-b border-border">{letter}</h2>
            <dl className="space-y-8">
              {grouped[letter].map(item => (
                <div key={item.term}>
                  <dt className="text-xl font-semibold text-foreground mb-2">{item.term}</dt>
                  <dd className="text-lg text-foreground/80 leading-relaxed pl-4 border-l-4 border-muted">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
