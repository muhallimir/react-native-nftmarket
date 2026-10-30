// NFT Advanced Search utilities - pure functions for TDD

export function searchNFTs(nfts, query) {
  if (!Array.isArray(nfts)) return [];
  if (!query) return nfts;
  const term = query.toLowerCase().trim();
  return nfts.filter(nft => {
    const name = (nft.name || '').toLowerCase();
    const desc = (nft.description || '').toLowerCase();
    const collection = (nft.collection || '').toLowerCase();
    const creator = (nft.creator || '').toLowerCase();
    return name.includes(term) || desc.includes(term) || collection.includes(term) || creator.includes(term);
  });
}

export function filterNFTs(nfts, filters = {}) {
  if (!Array.isArray(nfts)) return [];
  return nfts.filter(nft => {
    if (filters.minPrice != null && (nft.price || 0) < filters.minPrice) return false;
    if (filters.maxPrice != null && (nft.price || 0) > filters.maxPrice) return false;
    if (filters.collection && (nft.collection || '') !== filters.collection) return false;
    if (filters.creator && (nft.creator || '') !== filters.creator) return false;
    if (filters.rarity && (nft.rarity || '') !== filters.rarity) return false;
    if (filters.verified != null && nft.verified !== filters.verified) return false;
    return true;
  });
}

export function sortNFTs(nfts, sortBy = 'recent') {
  if (!Array.isArray(nfts)) return [];
  const sorted = [...nfts];
  switch (sortBy) {
    case 'price_asc': return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'price_desc': return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'name': return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'rarity': return sorted.sort((a, b) => (b.rarityScore || 0) - (a.rarityScore || 0));
    default: return sorted;
  }
}

export function getFilterOptions(nfts) {
  if (!Array.isArray(nfts)) return { collections: [], creators: [], rarities: [] };
  const collections = [...new Set(nfts.map(n => n.collection).filter(Boolean))];
  const creators = [...new Set(nfts.map(n => n.creator).filter(Boolean))];
  const rarities = [...new Set(nfts.map(n => n.rarity).filter(Boolean))];
  return { collections, creators, rarities };
}