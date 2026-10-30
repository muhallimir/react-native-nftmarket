// NFT Market Feature 21: NFT Auction Extended utilities

export function getAuctionHistory(auctions) {
  if (!Array.isArray(auctions)) return [];
  return auctions.filter(a => a.status === 'ended').sort((a, b) => b.endedAt - a.endedAt);
}

export function getActiveAuctions(auctions) {
  if (!Array.isArray(auctions)) return [];
  return auctions.filter(a => a.status === 'active');
}

export function getAuctionStats(auctions) {
  if (!Array.isArray(auctions)) return { total: 0, active: 0, ended: 0, totalVolume: 0 };
  const active = auctions.filter(a => a.status === 'active').length;
  const ended = auctions.filter(a => a.status === 'ended').length;
  const totalVolume = auctions.reduce((sum, a) => sum + (a.currentBid || 0), 0);
  return { total: auctions.length, active, ended, totalVolume };
}

export function extendAuction(auction, hours) {
  if (!auction) return null;
  return { ...auction, endTime: auction.endTime + hours * 3600000 };
}

export function getBidIncrement(currentBid) {
  if (currentBid < 1) return 0.1;
  if (currentBid < 10) return 0.5;
  if (currentBid < 100) return 1;
  return 5;
}