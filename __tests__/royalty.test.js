import { calculateRoyalty, getRoyaltyBreakdown, formatRoyalty, getRoyaltyTier, validateRoyalty } from '../utils/royalty';

describe('NFT Royalty - NFT Feature 9', () => {
  test('calculateRoyalty calculates correctly', () => {
    expect(calculateRoyalty(100, 5)).toBe(5);
    expect(calculateRoyalty(100, 0)).toBe(0);
  });

  test('calculateRoyalty handles null', () => {
    expect(calculateRoyalty(null, 5)).toBe(0);
  });

  test('getRoyaltyBreakdown returns breakdown', () => {
    const breakdown = getRoyaltyBreakdown(100, 5, 2.5);
    expect(breakdown.royalty).toBe(5);
    expect(breakdown.platformFee).toBe(2.5);
    expect(breakdown.sellerProceeds).toBe(92.5);
  });

  test('formatRoyalty formats correctly', () => {
    expect(formatRoyalty(5)).toBe('5%');
    expect(formatRoyalty(0)).toBe('0%');
    expect(formatRoyalty(null)).toBe('0%');
  });

  test('getRoyaltyTier returns tier', () => {
    expect(getRoyaltyTier(0)).toBe('none');
    expect(getRoyaltyTier(2)).toBe('low');
    expect(getRoyaltyTier(5)).toBe('standard');
    expect(getRoyaltyTier(7)).toBe('high');
    expect(getRoyaltyTier(10)).toBe('premium');
  });

  test('validateRoyalty validates', () => {
    expect(validateRoyalty(5).valid).toBe(true);
    expect(validateRoyalty(15).valid).toBe(false);
    expect(validateRoyalty(null).valid).toBe(true);
  });
});