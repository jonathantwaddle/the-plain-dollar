import { CardData, ProductData, BestOfList, GuideData, GlossaryTerm, LetterIssue } from './types';

import bestofData from './data/bestof.json';
import guidesData from './data/guides.json';
import glossaryData from './data/glossary.json';
import lettersData from './data/letters.json';

const cardModules = import.meta.glob('./data/cards/*.json', { eager: true });
export const allCards: CardData[] = Object.values(cardModules) as CardData[];
export const cardsBySlug: Record<string, CardData> = Object.fromEntries(allCards.map(c => [c.slug, c]));

const productModules = import.meta.glob('./data/products/*.json', { eager: true });
export const allProducts: ProductData[] = Object.values(productModules) as ProductData[];
export const productsBySlug: Record<string, ProductData> = Object.fromEntries(allProducts.map(p => [p.slug, p]));

export const bestOfLists: BestOfList[] = bestofData as BestOfList[];
export const guides: GuideData[] = guidesData as GuideData[];
export const glossary: GlossaryTerm[] = glossaryData as GlossaryTerm[];
export const letters: LetterIssue[] = lettersData as LetterIssue[];
