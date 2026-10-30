// NFT Market Feature 20: Dynamic Pricing utilities

export function calculateDynamicPrice(basePrice, demand, supply) {
  if (!basePrice || basePrice <= 0) return 0;
  const ratio = (demand || 1) / (supply || 1);
  let multiplier = 1;
  if (ratio > 2) multiplier = 1.5;
  else if (ratio > 1) multiplier = 1.2;
  else if (ratio < 0.5) multiplier = 0.8;
  else if (ratio < 1) multiplier = 0.9;
  return basePrice * multiplier;
}

export function getPriceMultiplier(demand, supply) {
  const ratio = (demand || 1) / (supply || 1);
  if (ratio > 2) return 1.5;
  if (ratio > 1) return 1.2;
  if (ratio < 0.5) return 0.8;
  if (ratio < 1) return 0.9;
  return 1.0;
}

export function getDemandLevel(demand, supply) {
  const ratio = (demand || 1) / (supply || 1);
  if (ratio > 2) return 'very_high';
  if (ratio > 1) return 'high';
  if (ratio > 0.5) return 'medium';
  return 'low';
}

export function formatDynamicPrice(price) {
  return `${price.toFixed(4)} ETH`;
}

export function getPriceHistory_trend(prices) {
  if (!Array.isArray(prices) || prices.length < 2) return 'stable';
  const recent = prices.slice(-3);
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const prev = prices.slice(-6, -3);
  if (prev.length === 0) return 'stable';
  const prevAvg = prev.reduce((a, b) => a + b, 0) / prev.length;
  if (avg > prevAvg * 1.1) return 'rising';
  if (avg < prevAvg * 0.9) return 'falling';
  return 'stable';
}