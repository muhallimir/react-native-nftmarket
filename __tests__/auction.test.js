import { createAuction, placeBid, isAuctionEnded, getAuctionWinner, endAuction, getTimeRemainingAuction, formatBidHistory } from '../utils/auction';

describe('NFT Auction - NFT Feature 11', () => {
  test('createAuction creates auction', () => {
    const auction = createAuction('nft1', 1.0, 24);
    expect(auction).not.toBeNull();
    expect(auction.startPrice).toBe(1.0);
    expect(auction.status).toBe('active');
  });

  test('createAuction rejects invalid', () => {
    expect(createAuction(null, 1.0)).toBeNull();
    expect(createAuction('nft1', 0)).toBeNull();
  });

  test('placeBid places valid bid', () => {
    const auction = createAuction('nft1', 1.0, 24);
    const updated = placeBid(auction, 'bidder1', 1.5);
    expect(updated).not.toBeNull();
    expect(updated.currentBid).toBe(1.5);
    expect(updated.highestBidder).toBe('bidder1');
  });

  test('placeBid rejects lower bid', () => {
    const auction = createAuction('nft1', 1.0, 24);
    const updated = placeBid(auction, 'bidder1', 0.5);
    expect(updated).toBeNull();
  });

  test('getAuctionWinner returns winner', () => {
    const auction = createAuction('nft1', 1.0, 24);
    const updated = placeBid(auction, 'bidder1', 1.5);
    const ended = endAuction(updated);
    const winner = getAuctionWinner(ended);
    expect(winner.bidder).toBe('bidder1');
    expect(winner.amount).toBe(1.5);
  });

  test('endAuction ends auction', () => {
    const auction = createAuction('nft1', 1.0, 24);
    const ended = endAuction(auction);
    expect(ended.status).toBe('ended');
  });

  test('formatBidHistory formats bids', () => {
    const bids = [{ bidder: 'Alice', amount: 1.5 }];
    const formatted = formatBidHistory(bids);
    expect(formatted[0].formatted).toContain('Alice');
  });
});