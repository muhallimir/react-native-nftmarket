import { generateShareUrl, generateShareText, getSharePlatforms, formatShareMessage, getShareCount, incrementShareCount } from '../utils/socialShare';

describe('NFT Social Sharing - NFT Feature 10', () => {
  const nft = { _id: '123', name: 'Cool NFT', price: 2.5 };

  test('generateShareUrl generates URL', () => {
    expect(generateShareUrl(nft)).toBe('https://nftmarket.app/nft/123');
  });

  test('generateShareUrl handles null', () => {
    expect(generateShareUrl(null)).toBe('');
  });

  test('generateShareText generates text', () => {
    const text = generateShareText(nft);
    expect(text).toContain('Cool NFT');
    expect(text).toContain('2.5 ETH');
  });

  test('getSharePlatforms returns platforms', () => {
    const platforms = getSharePlatforms();
    expect(platforms.length).toBeGreaterThan(0);
    expect(platforms.map(p => p.name)).toContain('Twitter');
  });

  test('formatShareMessage formats for Twitter', () => {
    const msg = formatShareMessage(nft, 'Twitter');
    expect(msg).toContain('Cool NFT');
    expect(msg).toContain('nft/123');
  });

  test('getShareCount returns count', () => {
    expect(getShareCount({ shareCount: 5 })).toBe(5);
    expect(getShareCount({})).toBe(0);
    expect(getShareCount(null)).toBe(0);
  });

  test('incrementShareCount increments', () => {
    const result = incrementShareCount({ shareCount: 5 });
    expect(result.shareCount).toBe(6);
    const result2 = incrementShareCount({});
    expect(result2.shareCount).toBe(1);
  });
});