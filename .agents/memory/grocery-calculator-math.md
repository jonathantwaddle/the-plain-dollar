---
name: Grocery calculator math
description: Why grocery card comparisons must use explicit per-card reward rules, not inferred rates
---

Rule: any grocery/rewards comparison calculator must use an explicit, hand-verified rule table per card (grocery rate, annual cap, post-cap rate, other-spend rate) and exclude cards without verified rules.

**Why:** Parsing the first `rewards[].rate` string (e.g. "3%") and applying it to all spending produced materially wrong recommendations — e.g. Blue Cash Everyday scored as 3% on everything (real: 3% groceries capped at $6k/yr, 1% other), flipping the "Winner" ranking. A completion review rejected the mobile app for this.

**How to apply:** The mobile app has the corrected pattern in `artifacts/plain-dollar-mobile/lib/groceryMath.ts` (rule table + pure `computeGroceryResults`, tested by `scripts/grocery-math.test.mts`). The web app's `GroceryCardMath.tsx` still contains the flawed rate-string fallback for unknown cards — reuse the rule-table approach if that page is touched. Also: the mobile app keeps a copy of card/product JSON; when web data changes, re-copy or use the shared-package follow-up task.
