import { getFavoriteNFTs, getFavoriteCount, toggleFavoriteNFT, getFavoriteCollections, isFavoriteNFT } from '../utils/favoritesExt';

describe('Favorites Extended - NFT Feature 25', () => {
  const nfts = [{ _id: '1', collection: 'Art' }, { _id: '2', collection: 'Gaming' }];

  test('getFavoriteNFTs filters', () => {
    const favs = getFavoriteNFTs(nfts, ['1']);
    expect(favs).toHaveLength(1);
  });

  test('getFavoriteCount returns count', () => {
    expect(getFavoriteCount(['1', '2'])).toBe(2);
  });

  test('toggleFavoriteNFT toggles', () => {
    const added = toggleFavoriteNFT([], '1');
    expect(added).toContain('1');
    const removed = toggleFavoriteNFT(added, '1');
    expect(removed).not.toContain('1');
  });

  test('getFavoriteCollections groups', () => {
    const cols = getFavoriteCollections(nfts, ['1', '2']);
    expect(cols).toHaveLength(2);
  });

  test('isFavoriteNFT checks', () => {
    expect(isFavoriteNFT(['1'], '1')).toBe(true);
    expect(isFavoriteNFT(['1'], '2')).toBe(false);
  });
});