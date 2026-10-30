import { calculateDynamicPrice, getPriceMultiplier, getDemandLevel, formatDynamicPrice, getPriceHistory_trend } from '../utils/dynamicPricing';

describe('Dynamic Pricing - NFT Feature 20', () => {
  test('calculateDynamicPrice calculates', () => {
    expect(calculateDynamicPrice(1.0, 10, 5)).toBe(1.2); // high demand
    expect(calculateDynamicPrice(1.0, 1, 10)).toBe(0.8); // low demand
  });

  test('calculateDynamicPrice handles invalid', () => {
    expect(calculateDynamicPrice(0, 10, 5)).toBe(0);
  });

  test('getPriceMultiplier returns multiplier', () => {
    expect(getPriceMultiplier(10, 5)).toBe(1.2);
    expect(getPriceMultiplier(1, 1)).toBe(1.0);
  });

  test('getDemandLevel returns level', () => {
    expect(getDemandLevel(10, 5)).toBe('high');
    expect(getDemandLevel(1, 10)).toBe('low');
  });

  test('formatDynamicPrice formats', () => {
    expect(formatDynamicPrice(1.5)).toBe('1.5000 ETH');
  });

  test('getPriceHistory_trend returns trend', () => {
    expect(getPriceHistory_trend([1, 2, 3, 4, 5, 6])).toBe('rising');
    expect(getPriceHistory_trend([6, 5, 4, 3, 2, 1])).toBe('falling');
    expect(getPriceHistory_trend([1, 2])).toBe('stable');
  });
});