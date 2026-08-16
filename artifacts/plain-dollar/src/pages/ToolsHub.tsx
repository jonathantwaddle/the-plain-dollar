import { Link } from 'wouter';

export default function ToolsHub() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 px-6 md:px-8 py-8 md:py-14">
      <section>
        <h1 className="text-4xl md:text-5xl font-serif text-primary font-semibold mb-6">Calculators and tools</h1>
        <p className="text-xl text-foreground/90 leading-relaxed mb-8">
          Do the math yourself. Our tools help you cut through the marketing and see the real numbers.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/tools/annual-fee-break-even/" className="group border border-border rounded bg-card p-6 no-underline hover:border-accent transition-colors block">
          <h2 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent mb-3">Annual fee break-even calculator</h2>
          <p className="text-foreground/80">Find out exactly how much you need to spend on a card for the annual fee to pay for itself.</p>
        </Link>
        
        <Link href="/tools/grocery-card-math/" className="group border border-border rounded bg-card p-6 no-underline hover:border-accent transition-colors block">
          <h2 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent mb-3">Grocery card math</h2>
          <p className="text-foreground/80">Compare the top grocery credit cards based on your actual monthly supermarket spending.</p>
        </Link>
      </div>
    </div>
  );
}
