import { useParams, Link, useLocation } from 'wouter';
import { allProducts } from '@/data';
import NotFound from './not-found';

const sectionTitles: Record<string, string> = {
  protect: "Protect yourself",
  plan: "Plan ahead",
  save: "Save money",
  health: "Health & care"
};

const sectionIntros: Record<string, string> = {
  protect: "Insurance and identity protection you actually need. We help you skip the fear-based marketing and buy solid coverage.",
  plan: "Wills, trusts, and estate planning. Do not leave a mess for your family to clean up.",
  save: "High-yield accounts and tools to keep more of what you earn.",
  health: "Navigating Medicare and supplemental coverage without getting scammed."
};

export default function SectionHub() {
  const params = useParams<{ section?: string }>();
  const [location] = useLocation();

  // Static routes (/protect/, /plan/, /save/, /health/) don't provide a :section param.
  // Derive the section from the first path segment when the param is absent.
  const section = params.section ?? location.split('/').filter(Boolean)[0] ?? '';

  if (!sectionTitles[section]) return <NotFound />;

  const productsInSection = allProducts.filter(p => p.section === section);
  const categories = Array.from(new Set(productsInSection.map(p => p.category)));
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: productsInSection.filter(p => p.category === cat).length
  }));

  return (
    <div>
      {/* ── Forest-green hero ── */}
      <div className="panel-dark w-full">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-14 md:py-18">
          <span className="eyebrow mb-4">The Plain Dollar</span>
          <h1
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', lineHeight: 1.1, letterSpacing: '-0.015em', color: 'white' }}
          >
            {sectionTitles[section]}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'hsl(140 20% 78%)', maxWidth: '52ch' }}>
            {sectionIntros[section]}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {categoryCounts.length > 0 ? (
          <section>
            <h2 className="text-xl font-serif font-bold text-primary mb-1">Categories</h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(0 0% 52%)' }}>
              {productsInSection.length} product{productsInSection.length !== 1 ? 's' : ''} reviewed
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryCounts.map(cat => (
                <Link
                  key={cat.name}
                  href={`/${section}/${cat.name}/`}
                  className="group bg-white rounded-xl px-5 py-5 no-underline transition-all hover:-translate-y-0.5 hover:border-primary"
                  style={{ border: '1.5px solid hsl(var(--border))', boxShadow: 'var(--shadow-sm)', display: 'block' }}
                >
                  <h3 className="font-bold mb-1 transition-colors group-hover:text-primary capitalize" style={{ color: 'hsl(var(--foreground))', fontSize: '0.95rem' }}>
                    {cat.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-sm" style={{ color: 'hsl(0 0% 52%)' }}>
                    {cat.count} product{cat.count !== 1 ? 's' : ''} reviewed
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <p className="italic" style={{ color: 'hsl(0 0% 52%)' }}>
            We are currently updating our reviews for this section. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
