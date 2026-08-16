import { AffiliateCallout } from './AffiliateCallout';

// Re-export via AffiliateCallout so existing page imports continue to work.
export function AffiliateDisclosure() {
  return <AffiliateCallout />;
}
