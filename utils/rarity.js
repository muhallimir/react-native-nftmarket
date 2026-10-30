// NFT Market Feature 22: NFT Rarity utilities

export function calculateRarityScore(nft, collection) {
  if (!nft || !collection) return 0;
  const traitCount = Object.keys(nft.traits || {}).length;
  const rarity = (nft.rarityScore || 0) + traitCount * 5;
  return Math.min(100, rarity);
}

export function getRarityTier(score) {
  if (score >= 90) return 'Legendary';
  if (score >= 70) return 'Epic';
  if (score >= 50) return 'Rare';
  if (score >= 30) return 'Uncommon';
  return 'Common';
}

export function getRarityColor(tier) {
  const colors = {
    Legendary: '#f59e0b',
    Epic: '#8b5cf6',
    Rare: '#3b82f6',
    Uncommon: '#10b981',
    Common: '#6b7280',
  };
  return colors[tier] || '#6b7280';
}

export function sortByRarity(nfts) {
  if (!Array.isArray(nfts)) return [];
  return [...nfts].sort((a, b) => (b.rarityScore || 0) - (a.rarityScore || 0));
}