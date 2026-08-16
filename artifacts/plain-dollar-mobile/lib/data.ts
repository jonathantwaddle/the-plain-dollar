import type { CardData, ProductData } from "@/lib/types";

import card0 from "@/data/cards/amex-blue-cash-everyday.json";
import card1 from "@/data/cards/amex-blue-cash-preferred.json";
import card2 from "@/data/cards/amex-gold-card.json";
import card3 from "@/data/cards/bank-of-america-customized-cash.json";
import card4 from "@/data/cards/capital-one-savorone.json";
import card5 from "@/data/cards/capital-one-venture-rewards.json";
import card6 from "@/data/cards/capital-one-venture-x.json";
import card7 from "@/data/cards/capital-one-ventureone.json";
import card8 from "@/data/cards/chase-freedom-flex.json";
import card9 from "@/data/cards/chase-freedom-unlimited.json";
import card10 from "@/data/cards/chase-sapphire-preferred.json";
import card11 from "@/data/cards/chase-sapphire-reserve.json";
import card12 from "@/data/cards/citi-double-cash.json";
import card13 from "@/data/cards/citi-simplicity.json";
import card14 from "@/data/cards/discover-it-cash-back.json";
import card15 from "@/data/cards/discover-it-miles.json";
import card16 from "@/data/cards/wells-fargo-active-cash.json";
import product0 from "@/data/products/adt.json";
import product1 from "@/data/products/allianz-travel.json";
import product2 from "@/data/products/american-home-shield.json";
import product3 from "@/data/products/aura.json";
import product4 from "@/data/products/bay-alarm-medical.json";
import product5 from "@/data/products/cit-bank.json";
import product6 from "@/data/products/eargo.json";
import product7 from "@/data/products/identity-guard.json";
import product8 from "@/data/products/jabra-enhance.json";
import product9 from "@/data/products/legalzoom.json";
import product10 from "@/data/products/medical-guardian.json";
import product11 from "@/data/products/mobilehelp.json";
import product12 from "@/data/products/raisin.json";
import product13 from "@/data/products/trust-and-will.json";

export const allCards: CardData[] = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16] as CardData[];
export const allProducts: ProductData[] = [product0, product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13] as ProductData[];

export const cardsBySlug: Record<string, CardData> = Object.fromEntries(allCards.map((c) => [c.slug, c]));
export const productsBySlug: Record<string, ProductData> = Object.fromEntries(allProducts.map((p) => [p.slug, p]));

export const SECTIONS: { key: ProductData["section"]; title: string; blurb: string }[] = [
  { key: "protect", title: "Protect", blurb: "Home security, identity, and legal basics" },
  { key: "plan", title: "Plan", blurb: "Wills, estates, and getting organized" },
  { key: "save", title: "Save", blurb: "High-yield savings and better rates" },
  { key: "health", title: "Health", blurb: "Hearing aids and medical alerts" },
];
