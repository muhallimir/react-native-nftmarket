// NFT Collection utilities - pure functions for TDD

export function getCollections(nfts) {
  if (!Array.isArray(nfts)) return [];
  const map = {};
  nfts.forEach(nft => {
    const col = nft.collection || 'Uncategorized';
    if (!map[col]) map[col] = [];
    map[col].push(nft);
  });
  return Object.entries(map).map(([name, items]) => ({
    name,
    count: items.length,
    floorPrice: Math.min(...items.map(i => i.price || 0)),
    items,
  }));
}

export function filterByCollection(nfts, collectionName) {
  if (!Array.isArray(nfts)) return [];
  if (!collectionName || collectionName === 'All') return nfts;
  return nfts.filter(n => (n.collection || 'Uncategorized') === collectionName);
}

export function getCollectionStats(collection) {
  if (!collection || !Array.isArray(collection.items)) return null;
  const prices = collection.items.map(i => i.price || 0);
  return {
    name: collection.name,
    count: collection.items.length,
    floorPrice: Math.min(...prices),
    avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    totalVolume: prices.reduce((a, b) => a + b, 0),
  };
}

export function sortCollections(collections, sortBy = 'count') {
  if (!Array.isArray(collections)) return [];
  const sorted = [...collections];
  if (sortBy === 'count') sorted.sort((a, b) => b.count - a.count);
  if (sortBy === 'floorPrice') sorted.sort((a, b) => a.floorPrice - b.floorPrice);
  if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}