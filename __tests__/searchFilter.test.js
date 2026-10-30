import { searchNFTs, filterNFTs, sortNFTs, getFilterOptions } from '../utils/searchFilter';

describe('NFT Advanced Search - NFT Feature 6', () => {
  const nfts = [
    { _id: '1', name: 'Cool Art', price: 1.5, collection: 'Art', creator: 'Alice', rarity: 'rare', verified: true },
    { _id: '2', name: 'Game Token', price: 0.5, collection: 'Gaming', creator: 'Bob', rarity: 'common', verified: false },
    { _id: '3', name: 'Rare Art', price: 3.0, collection: 'Art', creator: 'Alice', rarity: 'legendary', verified: true },
  ];

  test('searchNFTs searches by name', () => {
    const result = searchNFTs(nfts, 'art');
    expect(result).toHaveLength(2);
  });

  test('searchNFTs searches by creator', () => {
    const result = searchNFTs(nfts, 'alice');
    expect(result).toHaveLength(2);
  });

  test('searchNFTs returns all for empty query', () => {
    expect(searchNFTs(nfts, '')).toHaveLength(3);
  });

  test('filterNFTs filters by price range', () => {
    const result = filterNFTs(nfts, { minPrice: 1, maxPrice: 2 });
    expect(result).toHaveLength(1);
  });

  test('filterNFTs filters by collection', () => {
    const result = filterNFTs(nfts, { collection: 'Art' });
    expect(result).toHaveLength(2);
  });

  test('filterNFTs filters by verified', () => {
    const result = filterNFTs(nfts, { verified: true });
    expect(result).toHaveLength(2);
  });

  test('sortNFTs sorts by price asc', () => {
    const sorted = sortNFTs(nfts, 'price_asc');
    expect(sorted[0].price).toBe(0.5);
  });

  test('sortNFTs sorts by price desc', () => {
    const sorted = sortNFTs(nfts, 'price_desc');
    expect(sorted[0].price).toBe(3.0);
  });

  test('getFilterOptions returns options', () => {
    const opts = getFilterOptions(nfts);
    expect(opts.collections).toContain('Art');
    expect(opts.creators).toContain('Alice');
  });
});