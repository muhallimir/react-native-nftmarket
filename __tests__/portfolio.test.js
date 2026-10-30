import { getPortfolioValue, getPortfolioStats, getPortfolioByCollection, formatPortfolioValue } from '../utils/portfolio';

describe('Portfolio - NFT Feature 29', () => {
  const nfts = [
    { _id: '1', price: 1.5, collection: 'Art' },
    { _id: '2', price: 2.0, collection: 'Gaming' },
  ];

  test('getPortfolioValue sums', () => {
    expect(getPortfolioValue(nfts)).toBe(3.5);
  });

  test('getPortfolioStats returns stats', () => {
    const stats = getPortfolioStats(nfts);
    expect(stats.totalValue).toBe(3.5);
    expect(stats.count).toBe(2);
    expect(stats.collections).toBe(2);
  });

  test('getPortfolioByCollection groups', () => {
    const groups = getPortfolioByCollection(nfts);
    expect(groups).toHaveLength(2);
  });

  test('formatPortfolioValue formats', () => {
    expect(formatPortfolioValue(3.5)).toBe('3.50 ETH');
  });

  test('getPortfolioStats handles empty', () => {
    expect(getPortfolioStats([])).toBeNull();
  });
});