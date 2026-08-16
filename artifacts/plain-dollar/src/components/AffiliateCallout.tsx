import { ShieldCheck } from 'lucide-react';

export function AffiliateCallout() {
  return (
    <div
      className="affiliate-callout mb-6 flex gap-3 items-start"
      role="note"
      data-testid="affiliate-callout"
    >
      <ShieldCheck
        className="shrink-0 mt-0.5"
        size={18}
        style={{ color: 'hsl(40 54% 50%)' }}
        aria-hidden="true"
      />
      <p className="text-sm text-foreground m-0">
        <strong>Advertiser disclosure:</strong>{' '}
        Some links on this page are affiliate links. If you apply or buy and are approved, we
        may earn a commission. This does not change our ratings or the order we show products.
      </p>
    </div>
  );
}
