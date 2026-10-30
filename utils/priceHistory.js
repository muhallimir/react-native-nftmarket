// NFT Price History utilities - pure functions for TDD

export function addPricePoint(history, price, timestamp) {
  if (!Array.isArray(history)) history = [];
  return [...history, { price: Number(price), timestamp: timestamp || Date.now() }];
}

export function getPriceHistory(history) {
  if (!Array.isArray(history)) return [];
  return [...history].sort((a, b) => a.timestamp - b.timestamp);
}

export function getFloorPrice(history) {
  if (!Array.isArray(history) || history.length === 0) return null;
  return Math.min(...history.map(h => h.price));
}

export function getHighestPrice(history) {
  if (!Array.isArray(history) || history.length === 0) return null;
  return Math.max(...history.map(h => h.price));
}

export function getAveragePrice(history) {
  if (!Array.isArray(history) || history.length === 0) return null;
  const sum = history.reduce((a, b) => a + b.price, 0);
  return sum / history.length;
}

export function getPriceChange(history) {
  if (!Array.isArray(history) || history.length < 2) return null;
  const sorted = getPriceHistory(history);
  const first = sorted[0].price;
  const last = sorted[sorted.length - 1].price;
  const change = last - first;
  const percentChange = ((change / first) * 100).toFixed(2);
  return {
    first,
    last,
    change,
    percentChange: Number(percentChange),
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
  };
}

export function formatPriceChange(change) {
  if (!change) return '';
  const sign = change.change >= 0 ? '+' : '';
  return `${sign}${change.change.toFixed(2)} ETH (${sign}${change.percentChange}%)`;
}