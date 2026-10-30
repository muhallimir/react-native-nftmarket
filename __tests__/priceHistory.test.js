import { addPricePoint, getPriceHistory, getFloorPrice, getHighestPrice, getAveragePrice, getPriceChange, formatPriceChange } from '../utils/priceHistory';

describe('NFT Price History - NFT Feature 3', () => {
  test('addPricePoint adds point', () => {
    const h = addPricePoint([], 1.5, 1000);
    expect(h).toHaveLength(1);
    expect(h[0].price).toBe(1.5);
  });

  test('getPriceHistory sorts by timestamp', () => {
    const h = [{ price: 2, timestamp: 2000 }, { price: 1, timestamp: 1000 }];
    const sorted = getPriceHistory(h);
    expect(sorted[0].timestamp).toBe(1000);
  });

  test('getFloorPrice returns min', () => {
    const h = [{ price: 2 }, { price: 1 }, { price: 3 }];
    expect(getFloorPrice(h)).toBe(1);
  });

  test('getFloorPrice handles empty', () => {
    expect(getFloorPrice([])).toBeNull();
    expect(getFloorPrice(null)).toBeNull();
  });

  test('getHighestPrice returns max', () => {
    const h = [{ price: 2 }, { price: 5 }, { price: 1 }];
    expect(getHighestPrice(h)).toBe(5);
  });

  test('getAveragePrice calculates average', () => {
    const h = [{ price: 2 }, { price: 4 }];
    expect(getAveragePrice(h)).toBe(3);
  });

  test('getPriceChange calculates change', () => {
    const h = [{ price: 1, timestamp: 1000 }, { price: 2, timestamp: 2000 }];
    const change = getPriceChange(h);
    expect(change.trend).toBe('up');
    expect(change.percentChange).toBe(100);
  });

  test('getPriceChange returns null for single point', () => {
    expect(getPriceChange([{ price: 1, timestamp: 1000 }])).toBeNull();
  });

  test('formatPriceChange formats correctly', () => {
    const change = { change: 1, percentChange: 100 };
    expect(formatPriceChange(change)).toContain('+1.00');
  });
});