// NFT Market Feature 29: NFT Portfolio utilities

export function getPortfolioValue(nfts) {
  if (!Array.isArray(nfts)) return 0;
  return nfts.reduce((sum, n) => sum + (n.price || 0), 0);
}

export function getPortfolioStats(nfts) {
  if (!Array.isArray(nfts) || nfts.length === 0) return null;
  const totalValue = getPortfolioValue(nfts);
  const collections = [...new Set(nfts.map(n => n.collection).filter(Boolean))];
  const avgPrice = totalValue / nfts.length;
  return {
    totalValue,
    count: nfts.length,
    collections: collections.length,
    avgPrice,
    highestValue: Math.max(...nfts.map(n => n.price || 0)),
  };
}

export function getPortfolioByCollection(nfts) {
  if (!Array.isArray(nfts)) return [];
  const map = {};
  nfts.forEach(n => {
    const col = n.collection || 'Uncategorized';
    if (!map[col]) map[col] = { name: col, count: 0, value: 0 };
    map[col].count++;
    map[col].value += n.price || 0;
  });
  return Object.values(map);
}

export function formatPortfolioValue(value) {
  return `${value.toFixed(2)} ETH`;
}