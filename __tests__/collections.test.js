import { getCollections, filterByCollection, getCollectionStats, sortCollections } from '../utils/collections';

describe('NFT Collections - NFT Feature 1', () => {
  const nfts = [
    { _id: '1', name: 'NFT1', collection: 'Art', price: 1.5 },
    { _id: '2', name: 'NFT2', collection: 'Art', price: 2.0 },
    { _id: '3', name: 'NFT3', collection: 'Gaming', price: 0.5 },
  ];

  test('getCollections groups by collection', () => {
    const cols = getCollections(nfts);
    expect(cols).toHaveLength(2);
    expect(cols.find(c => c.name === 'Art').count).toBe(2);
  });

  test('getCollections handles empty', () => {
    expect(getCollections([])).toEqual([]);
    expect(getCollections(null)).toEqual([]);
  });

  test('filterByCollection filters correctly', () => {
    const result = filterByCollection(nfts, 'Art');
    expect(result).toHaveLength(2);
  });

  test('filterByCollection returns all for All', () => {
    expect(filterByCollection(nfts, 'All')).toHaveLength(3);
  });

  test('getCollectionStats returns stats', () => {
    const col = getCollections(nfts)[0];
    const stats = getCollectionStats(col);
    expect(stats.count).toBe(2);
    expect(stats.floorPrice).toBe(1.5);
  });

  test('sortCollections sorts by count', () => {
    const cols = getCollections(nfts);
    const sorted = sortCollections(cols, 'count');
    expect(sorted[0].name).toBe('Art');
  });
});