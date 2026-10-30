import { createBulkListing, calculateBulkDiscount, getBulkListingSummary, validateBulkListing, getBulkListingStatus } from '../utils/bulkListing';

describe('NFT Bulk Listing - NFT Feature 8', () => {
  const nfts = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];

  test('createBulkListing creates listing', () => {
    const listing = createBulkListing(nfts, 1.5);
    expect(listing).not.toBeNull();
    expect(listing.count).toBe(3);
    expect(listing.totalPrice).toBe(4.5);
  });

  test('createBulkListing returns null for invalid', () => {
    expect(createBulkListing([], 1.5)).toBeNull();
    expect(createBulkListing(nfts, 0)).toBeNull();
    expect(createBulkListing(null, 1.5)).toBeNull();
  });

  test('calculateBulkDiscount returns discount', () => {
    const tiers = [{ minCount: 3, discountPercent: 5 }, { minCount: 5, discountPercent: 10 }];
    expect(calculateBulkDiscount(3, tiers)).toBe(5);
    expect(calculateBulkDiscount(5, tiers)).toBe(10);
    expect(calculateBulkDiscount(2, tiers)).toBe(0);
  });

  test('getBulkListingSummary formats correctly', () => {
    const listing = createBulkListing(nfts, 1.5);
    expect(getBulkListingSummary(listing)).toContain('3 NFTs');
  });

  test('validateBulkListing validates', () => {
    const result = validateBulkListing(nfts, 1.5);
    expect(result.valid).toBe(true);
    expect(validateBulkListing([], 1.5).valid).toBe(false);
    expect(validateBulkListing(nfts, 0).valid).toBe(false);
  });

  test('getBulkListingStatus returns status', () => {
    const listing = createBulkListing(nfts, 1.5);
    expect(getBulkListingStatus(listing)).toBe('pending');
    expect(getBulkListingStatus(null)).toBe('unknown');
  });
});