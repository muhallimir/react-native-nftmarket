// NFT Market Feature 13: NFT Bundles utilities

export function createBundle(nfts, bundlePrice, name) {
  if (!Array.isArray(nfts) || nfts.length === 0) return null;
  if (!bundlePrice || bundlePrice <= 0) return null;
  const individualTotal = nfts.reduce((sum, n) => sum + (n.price || 0), 0);
  return {
    id: `bundle-${Date.now()}`,
    name: name || 'NFT Bundle',
    nftIds: nfts.map(n => n._id || n.id),
    count: nfts.length,
    nfts,
    bundlePrice,
    individualTotal,
    savings: individualTotal - bundlePrice,
    savingsPercent: individualTotal > 0 ? ((individualTotal - bundlePrice) / individualTotal * 100).toFixed(1) : 0,
    createdAt: Date.now(),
  };
}

export function validateBundle(nfts, bundlePrice) {
  const errors = [];
  if (!Array.isArray(nfts) || nfts.length < 2) errors.push('Bundle must contain at least 2 NFTs');
  if (!bundlePrice || bundlePrice <= 0) errors.push('Price must be greater than 0');
  const total = Array.isArray(nfts) ? nfts.reduce((sum, n) => sum + (n.price || 0), 0) : 0;
  if (bundlePrice >= total) errors.push('Bundle price must be less than individual total');
  return { valid: errors.length === 0, errors };
}

export function getBundleSavings(bundle) {
  if (!bundle) return 0;
  return bundle.savings || 0;
}