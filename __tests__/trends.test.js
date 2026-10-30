import { getTrendingNFTs, getTopGainers, getTopLosers, getMarketOverview } from '../utils/trends';

describe('Trends - NFT Feature 30', () => {
  const nfts = [
    { _id: '1', volume24h: 100, priceChange24h: 5 },
    { _id: '2', volume24h: 50, priceChange24h: -3 },
    { _id: '3', volume24h: 200, priceChange24h: 10 },
  ];

  test('getTrendingNFTs sorts by volume', () => {
    const trending = getTrendingNFTs(nfts, 2);
    expect(trending[0]._id).toBe('3');
  });

  test('getTopGainers filters positive', () => {
    const gainers = getTopGainers(nfts, 2);
    expect(gainers).toHaveLength(2);
  });

  test('getTopLosers filters negative', () => {
    const losers = getTopLosers(nfts, 2);
    expect(losers).toHaveLength(1);
  });

  test('getMarketOverview returns overview', () => {
    const overview = getMarketOverview(nfts);
    expect(overview.totalVolume).toBe(350);
    expect(overview.trending).toHaveLength(3);
  });
});