import { addSearchHistory, getSearchHistory, clearSearchHistory, getPopularSearches } from '../utils/searchHistory';

describe('Search History - NFT Feature 26', () => {
  test('addSearchHistory adds query', () => {
    const history = addSearchHistory([], 'laptop');
    expect(history).toContain('laptop');
  });

  test('addSearchHistory does not duplicate', () => {
    const history = addSearchHistory(['laptop'], 'laptop');
    expect(history).toHaveLength(1);
  });

  test('getSearchHistory limits', () => {
    const history = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(getSearchHistory(history, 3)).toHaveLength(3);
  });

  test('clearSearchHistory clears', () => {
    expect(clearSearchHistory()).toEqual([]);
  });

  test('getPopularSearches returns terms', () => {
    const nfts = [{ name: 'Cool Art' }, { collection: 'Gaming' }];
    const terms = getPopularSearches(nfts);
    expect(terms.length).toBeGreaterThan(0);
  });
});