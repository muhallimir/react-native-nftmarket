// NFT Bulk Listing utilities - pure functions for TDD

export function createBulkListing(nfts, price) {
  if (!Array.isArray(nfts) || nfts.length === 0 || !price || price <= 0) return null;
  return {
    id: `bulk-${Date.now()}`,
    nftIds: nfts.map(n => n._id || n.id),
    price: Number(price),
    count: nfts.length,
    totalPrice: Number(price) * nfts.length,
    createdAt: Date.now(),
    status: 'pending',
  };
}

export function calculateBulkDiscount(count, discountTiers = []) {
  if (!Array.isArray(discountTiers) || discountTiers.length === 0) return 0;
  const tier = discountTiers
    .filter(t => count >= t.minCount)
    .sort((a, b) => b.minCount - a.minCount)[0];
  return tier ? tier.discountPercent : 0;
}

export function getBulkListingSummary(listing) {
  if (!listing) return '';
  return `${listing.count} NFTs at ${listing.price} ETH each = ${listing.totalPrice} ETH total`;
}

export function validateBulkListing(nfts, price, maxBulk = 50) {
  const errors = [];
  if (!Array.isArray(nfts) || nfts.length === 0) errors.push('Select at least one NFT');
  if (nfts && nfts.length > maxBulk) errors.push(`Max ${maxBulk} NFTs per bulk listing`);
  if (!price || price <= 0) errors.push('Price must be greater than 0');
  return { valid: errors.length === 0, errors };
}

export function getBulkListingStatus(listing) {
  if (!listing) return 'unknown';
  return listing.status || 'pending';
}