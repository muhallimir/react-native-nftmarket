// NFT Market Feature 30: NFT Trends utilities

export function getTrendingNFTs(nfts, limit = 10) {
  if (!Array.isArray(nfts)) return [];
  return [...nfts]
    .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0) || (b.priceChange24h || 0) - (a.priceChange24h || 0))
    .slice(0, limit);
}

export function getTopGainers(nfts, limit = 5) {
  if (!Array.isArray(nfts)) return [];
  return [...nfts]
    .filter(n => (n.priceChange24h || 0) > 0)
    .sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0))
    .slice(0, limit);
}

export function getTopLosers(nfts, limit = 5) {
  if (!Array.isArray(nfts)) return [];
  return [...nfts]
    .filter(n => (n.priceChange24h || 0) < 0)
    .sort((a, b) => (a.priceChange24h || 0) - (b.priceChange24h || 0))
    .slice(0, limit);
}

export function getMarketOverview(nfts) {
  if (!Array.isArray(nfts) || nfts.length === 0) return null;
  const totalVolume = nfts.reduce((sum, n) => sum + (n.volume24h || 0), 0);
  const avgPriceChange = nfts.reduce((sum, n) => sum + (n.priceChange24h || 0), 0) / nfts.length;
  return {
    totalVolume,
    avgPriceChange: avgPriceChange.toFixed(2),
    trending: getTrendingNFTs(nfts, 3),
    gainers: getTopGainers(nfts, 3),
    losers: getTopLosers(nfts, 3),
  };
}