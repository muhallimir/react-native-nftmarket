// NFT Market Feature 12: Collection Stats utilities

export function getCollectionStats(collection, nfts) {
  if (!collection || !Array.isArray(nfts)) return null;
  const items = nfts.filter(n => (n.collection || '') === collection);
  if (items.length === 0) return null;
  const prices = items.map(n => n.price || 0);
  const owners = new Set(items.map(n => n.owner)).size;
  return {
    name: collection,
    itemCount: items.length,
    floorPrice: Math.min(...prices),
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    totalVolume: prices.reduce((a, b) => a + b, 0),
    uniqueOwners: owners,
    listedCount: items.filter(n => n.listed).length,
  };
}

export function getTopCollections(nfts, limit = 5) {
  if (!Array.isArray(nfts)) return [];
  const collections = [...new Set(nfts.map(n => n.collection).filter(Boolean))];
  return collections
    .map(c => getCollectionStats(c, nfts))
    .filter(Boolean)
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, limit);
}

export function getCollectionRanking(nfts) {
  if (!Array.isArray(nfts)) return [];
  const collections = getTopCollections(nfts, 100);
  return collections.map((c, i) => ({ ...c, rank: i + 1 }));
}