import { calculateRarityScore, getRarityTier, getRarityColor, sortByRarity } from '../utils/rarity';

describe('Rarity - NFT Feature 22', () => {
  test('calculateRarityScore calculates', () => {
    const score = calculateRarityScore({ rarityScore: 50, traits: { a: 1, b: 2 } }, {});
    expect(score).toBe(60);
  });

  test('getRarityTier returns tier', () => {
    expect(getRarityTier(95)).toBe('Legendary');
    expect(getRarityTier(75)).toBe('Epic');
    expect(getRarityTier(55)).toBe('Rare');
    expect(getRarityTier(35)).toBe('Uncommon');
    expect(getRarityTier(10)).toBe('Common');
  });

  test('getRarityColor returns color', () => {
    expect(getRarityColor('Legendary')).toBe('#f59e0b');
  });

  test('sortByRarity sorts', () => {
    const nfts = [{ rarityScore: 10 }, { rarityScore: 50 }];
    const sorted = sortByRarity(nfts);
    expect(sorted[0].rarityScore).toBe(50);
  });
});