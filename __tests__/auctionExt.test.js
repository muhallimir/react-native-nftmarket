import { getAuctionHistory, getActiveAuctions, getAuctionStats, extendAuction, getBidIncrement } from '../utils/auctionExt';

describe('Auction Extended - NFT Feature 21', () => {
  const auctions = [
    { id: '1', status: 'active', currentBid: 1.5 },
    { id: '2', status: 'ended', currentBid: 2.0, endedAt: Date.now() },
  ];

  test('getAuctionHistory returns ended', () => {
    expect(getAuctionHistory(auctions)).toHaveLength(1);
  });

  test('getActiveAuctions returns active', () => {
    expect(getActiveAuctions(auctions)).toHaveLength(1);
  });

  test('getAuctionStats returns stats', () => {
    const stats = getAuctionStats(auctions);
    expect(stats.total).toBe(2);
    expect(stats.active).toBe(1);
    expect(stats.ended).toBe(1);
  });

  test('extendAuction extends time', () => {
    const a = { endTime: 1000 };
    const extended = extendAuction(a, 2);
    expect(extended.endTime).toBe(1000 + 2 * 3600000);
  });

  test('getBidIncrement returns increment', () => {
    expect(getBidIncrement(0.5)).toBe(0.1);
    expect(getBidIncrement(5)).toBe(0.5);
    expect(getBidIncrement(50)).toBe(1);
  });
});