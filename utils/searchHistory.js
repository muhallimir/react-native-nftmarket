// NFT Market Feature 26: NFT Search History utilities

export function addSearchHistory(history, query) {
  if (!query || query.trim().length === 0) return history;
  const filtered = history.filter(q => q !== query);
  return [query, ...filtered].slice(0, 10);
}

export function getSearchHistory(history, limit = 5) {
  if (!Array.isArray(history)) return [];
  return history.slice(0, limit);
}

export function clearSearchHistory() {
  return [];
}

export function getPopularSearches(nfts, limit = 5) {
  if (!Array.isArray(nfts)) return [];
  const terms = new Set();
  nfts.forEach(n => {
    if (n.name) terms.add(n.name.split(' ')[0]);
    if (n.collection) terms.add(n.collection);
  });
  return [...terms].slice(0, limit);
}