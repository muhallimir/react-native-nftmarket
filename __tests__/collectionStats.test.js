import { getCollectionStats, getTopCollections, getCollectionRanking } from '../utils/collectionStats';

describe('Collection Stats - NFT Feature 12', () => {
  const nfts = [
    { _id: '1', collection: 'Art', price: 1.5, owner: 'Alice', listed: true },
    { _id: '2', collection: 'Art', price: 2.0, owner: 'Bob', listed: false },
    { _id: '3', collection: 'Gaming', price: 0.5, owner: 'Alice', listed: true },
  ];

  test('getCollectionStats returns stats', () => {
    const stats = getCollectionStats('Art', nfts);
    expect(stats.itemCount).toBe(2);
    expect(stats.floorPrice).toBe(1.5);
    expect(stats.uniqueOwners).toBe(2);
  });

  test('getCollectionStats returns null for empty', () => {
    expect(getCollectionStats('NonExistent', nfts)).toBeNull();
  });

  test('getTopCollections returns sorted', () => {
    const top = getTopCollections(nfts, 2);
    expect(top.length).toBe(2);
    expect(top[0].name).toBe('Art');
  });

  test('getCollectionRanking adds rank', () => {
    const ranked = getCollectionRanking(nfts);
    expect(ranked[0].rank).toBe(1);
  });
});