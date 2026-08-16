import React, { useMemo } from 'react';
import { Link, useSearch } from 'wouter';
import Fuse from 'fuse.js';
import { allCards, allProducts, guides, glossary } from '@/data';

// ---------------------------------------------------------------------------
// Search index items
// ---------------------------------------------------------------------------
interface SearchItem {
  id: string;
  type: 'card' | 'product' | 'guide' | 'glossary';
  title: string;
  subtitle: string;
  href: string;
  searchBody: string;
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const card of allCards) {
    items.push({
      id: `card:${card.slug}`,
      type: 'card',
      title: card.name,
      subtitle: [card.issuer, card.annual_fee === 0 ? 'No annual fee' : `$${card.annual_fee}/yr annual fee`].join(' · '),
      href: `/cards/reviews/${card.slug}/`,
      searchBody: [
        card.name,
        card.short_name,
        card.issuer,
        card.network,
        ...card.tags,
        ...card.best_for,
        card.skip_if,
        ...card.rewards.map(r => `${r.rate} on ${r.on}`),
        card.annual_fee === 0 ? 'no annual fee' : `annual fee ${card.annual_fee}`,
        card.foreign_transaction_fee,
        card.rating_reason,
      ].join(' '),
    });
  }

  for (const product of allProducts) {
    items.push({
      id: `product:${product.slug}`,
      type: 'product',
      title: product.name,
      subtitle: [product.brand, product.category.replace(/-/g, ' ')].join(' · '),
      href: `/${product.section}/${product.category}/${product.slug}/`,
      searchBody: [
        product.name,
        product.brand,
        product.section,
        product.category.replace(/-/g, ' '),
        ...product.best_for,
        product.skip_if,
        ...product.pros,
        ...product.cons,
        ...product.key_facts.map(kf => `${kf.label} ${kf.value}`),
        product.rating_reason,
        product.price.headline,
      ].join(' '),
    });
  }

  for (const guide of guides) {
    items.push({
      id: `guide:${guide.slug}`,
      type: 'guide',
      title: guide.title,
      subtitle: guide.description,
      href: `/guides/${guide.slug}/`,
      searchBody: [
        guide.title,
        guide.description,
        guide.section,
        guide.body,
        ...guide.faq.map(f => `${f.q} ${f.a}`),
      ].join(' '),
    });
  }

  for (const term of glossary) {
    items.push({
      id: `glossary:${term.term}`,
      type: 'glossary',
      title: term.term,
      subtitle: term.definition,
      href: `/glossary/#${encodeURIComponent(term.term.toLowerCase().replace(/\s+/g, '-'))}`,
      searchBody: [term.term, term.definition].join(' '),
    });
  }

  return items;
}

const ALL_ITEMS = buildIndex();

const fuse = new Fuse(ALL_ITEMS, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'subtitle', weight: 1.5 },
    { name: 'searchBody', weight: 1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
});

// ---------------------------------------------------------------------------
// Type labels / colours
// ---------------------------------------------------------------------------
const TYPE_META: Record<SearchItem['type'], { label: string; group: string; bg: string; text: string }> = {
  card:     { label: 'Card',    group: 'Credit Cards',    bg: 'bg-blue-100',   text: 'text-blue-800' },
  product:  { label: 'Product', group: 'Products',        bg: 'bg-green-100',  text: 'text-green-800' },
  guide:    { label: 'Guide',   group: 'Guides',          bg: 'bg-amber-100',  text: 'text-amber-800' },
  glossary: { label: 'Term',    group: 'Glossary',        bg: 'bg-slate-100',  text: 'text-slate-700' },
};

const TYPE_ORDER: SearchItem['type'][] = ['card', 'product', 'guide', 'glossary'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Search() {
  const rawSearch = useSearch();
  const params = new URLSearchParams(rawSearch);
  const query = (params.get('q') ?? '').trim();

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    return fuse.search(query);
  }, [query]);

  // Group by type in a stable order
  const grouped = useMemo(() => {
    const map = new Map<SearchItem['type'], SearchItem[]>();
    for (const r of results) {
      const t = r.item.type;
      if (!map.has(t)) map.set(t, []);
      map.get(t)!.push(r.item);
    }
    return TYPE_ORDER.filter(t => map.has(t)).map(t => ({ type: t, items: map.get(t)! }));
  }, [results]);

  const [activeIdx, setActiveIdx] = React.useState(0);

  // Flat list for keyboard nav
  const flatResults = useMemo(() => results.map(r => r.item), [results]);

  React.useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (flatResults.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[activeIdx]) {
      window.location.href = flatResults[activeIdx].href;
    }
  }

  let globalIdx = 0; // tracks position in flattened list for keyboard focus

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-8 py-8 md:py-14" onKeyDown={handleKeyDown} tabIndex={-1}>
      <h1 className="font-serif text-3xl font-semibold mb-2">Search</h1>

      {/* Search bar */}
      <SearchBar initialQuery={query} />

      {/* Results */}
      {query.length >= 2 ? (
        results.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No results for <strong>"{query}"</strong>. Try a card name, product type, or keyword like "no annual fee".
          </p>
        ) : (
          <div className="mt-6 space-y-8">
            <p className="text-sm text-muted-foreground">
              {results.length} result{results.length !== 1 ? 's' : ''} for <strong>"{query}"</strong>
            </p>
            {grouped.map(({ type, items }) => {
              const meta = TYPE_META[type];
              return (
                <section key={type} aria-label={meta.group}>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 border-b pb-1">
                    {meta.group}
                  </h2>
                  <ul className="space-y-1" role="list">
                    {items.map(item => {
                      const idx = globalIdx++;
                      const isActive = idx === activeIdx;
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className={[
                              'flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors no-underline group',
                              isActive
                                ? 'bg-accent/20 ring-1 ring-accent/40'
                                : 'hover:bg-muted',
                            ].join(' ')}
                            onMouseEnter={() => setActiveIdx(idx)}
                            aria-current={isActive ? 'true' : undefined}
                          >
                            <span
                              className={`mt-0.5 shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}
                            >
                              {meta.label}
                            </span>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground leading-snug">{item.title}</p>
                              {item.subtitle && (
                                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )
      ) : query.length > 0 ? (
        <p className="mt-8 text-muted-foreground text-sm">Keep typing…</p>
      ) : (
        <p className="mt-8 text-muted-foreground">
          Search across credit cards, insurance, savings products, guides, and glossary terms.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SearchBar — standalone form so pressing Enter navigates
// ---------------------------------------------------------------------------
function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = React.useState(initialQuery);

  // Keep in sync if the parent query changes (e.g. browser back)
  React.useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      window.location.href = `/search/?q=${encodeURIComponent(q)}`;
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="mt-4">
      <label htmlFor="search-input" className="sr-only">Search</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          id="search-input"
          type="search"
          autoFocus
          autoComplete="off"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search cards, products, guides…"
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-base"
        />
      </div>
    </form>
  );
}
