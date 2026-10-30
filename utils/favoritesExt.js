// NFT Market Feature 25: NFT Favorites Extended utilities

export function getFavoriteNFTs(nfts, favoriteIds) {
  if (!Array.isArray(nfts) || !Array.isArray(favoriteIds)) return [];
  return nfts.filter(n => favoriteIds.includes(n._id || n.id));
}

export function getFavoriteCount(favoriteIds) {
  return Array.isArray(favoriteIds) ? favoriteIds.length : 0;
}

export function toggleFavoriteNFT(favorites, nftId) {
  if (favorites.includes(nftId)) return favorites.filter(id => id !== nftId);
  return [...favorites, nftId];
}

export function getFavoriteCollections(nfts, favoriteIds) {
  const favNfts = getFavoriteNFTs(nfts, favoriteIds);
  const collections = [...new Set(favNfts.map(n => n.collection).filter(Boolean))];
  return collections.map(c => ({ name: c, count: favNfts.filter(n => n.collection === c).length }));
}

export function isFavoriteNFT(favorites, nftId) {
  return Array.isArray(favorites) && favorites.includes(nftId);
}