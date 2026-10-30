// NFT Market Feature 11: Auction System utilities

export function createAuction(nftId, startPrice, duration, reservePrice) {
  if (!nftId || !startPrice || startPrice <= 0) return null;
  const endTime = Date.now() + (duration || 24) * 3600000;
  return {
    id: `auction-${Date.now()}`,
    nftId,
    startPrice,
    currentBid: startPrice,
    reservePrice: reservePrice || startPrice,
    highestBidder: null,
    bids: [],
    startTime: Date.now(),
    endTime,
    status: 'active',
  };
}

export function placeBid(auction, bidder, amount) {
  if (!auction || auction.status !== 'active') return null;
  if (amount <= auction.currentBid) return null;
  if (Date.now() > auction.endTime) return null;
  const bid = { bidder, amount, timestamp: Date.now() };
  return {
    ...auction,
    currentBid: amount,
    highestBidder: bidder,
    bids: [...auction.bids, bid],
  };
}

export function isAuctionEnded(auction) {
  if (!auction) return true;
  return Date.now() > auction.endTime || auction.status === 'ended';
}

export function getAuctionWinner(auction) {
  if (!auction || !isAuctionEnded(auction)) return null;
  if (auction.currentBid < auction.reservePrice) return null;
  return { bidder: auction.highestBidder, amount: auction.currentBid };
}

export function endAuction(auction) {
  if (!auction) return null;
  return { ...auction, status: 'ended', endedAt: Date.now() };
}

export function getTimeRemainingAuction(auction) {
  if (!auction) return 0;
  return Math.max(0, auction.endTime - Date.now());
}

export function formatBidHistory(bids) {
  if (!Array.isArray(bids)) return [];
  return bids.map(b => ({ ...b, formatted: `${b.bidder}: ${b.amount} ETH` }));
}