// NFT Activity Feed utilities - pure functions for TDD

export const ACTIVITY_TYPES = ['sale', 'listing', 'bid', 'transfer', 'mint'];

export function createActivity(type, nft, from, to, price) {
  if (!ACTIVITY_TYPES.includes(type)) return null;
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    nftId: nft?._id || nft?.id,
    nftName: nft?.name || 'Unknown NFT',
    from: from || 'Unknown',
    to: to || 'Unknown',
    price: price || 0,
    timestamp: Date.now(),
  };
}

export function filterActivities(activities, type) {
  if (!Array.isArray(activities)) return [];
  if (!type || type === 'all') return activities;
  return activities.filter(a => a.type === type);
}

export function sortActivities(activities, order = 'desc') {
  if (!Array.isArray(activities)) return [];
  const sorted = [...activities].sort((a, b) => b.timestamp - a.timestamp);
  return order === 'asc' ? sorted.reverse() : sorted;
}

export function getActivityIcon(type) {
  const icons = {
    sale: '💰',
    listing: '📋',
    bid: '🔨',
    transfer: '↔️',
    mint: '✨',
  };
  return icons[type] || '📄';
}

export function getActivityMessage(activity) {
  if (!activity) return '';
  switch (activity.type) {
    case 'sale': return `${activity.nftName} sold for ${activity.price} ETH`;
    case 'listing': return `${activity.nftName} listed for ${activity.price} ETH`;
    case 'bid': return `Bid of ${activity.price} ETH on ${activity.nftName}`;
    case 'transfer': return `${activity.nftName} transferred from ${activity.from} to ${activity.to}`;
    case 'mint': return `${activity.nftName} minted by ${activity.from}`;
    default: return `${activity.nftName} - ${activity.type}`;
  }
}

export function getRecentActivities(activities, limit = 10) {
  if (!Array.isArray(activities)) return [];
  return sortActivities(activities).slice(0, limit);
}