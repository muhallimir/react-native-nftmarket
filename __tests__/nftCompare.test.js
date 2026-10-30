import { addToNFTCompare, getNFTCompareFields, getNFTCompareValue, removeFromNFTCompare } from '../utils/nftCompare';

describe('NFT Compare - NFT Feature 27', () => {
  const nfts = [{ _id: '1', name: 'NFT1', price: 1.5, collection: 'Art' }];

  test('addToNFTCompare adds nft', () => {
    const result = addToNFTCompare([], nfts[0]);
    expect(result).toHaveLength(1);
  });

  test('addToNFTCompare does not duplicate', () => {
    const result = addToNFTCompare(nfts, nfts[0]);
    expect(result).toHaveLength(1);
  });

  test('getNFTCompareFields returns fields', () => {
    const fields = getNFTCompareFields(nfts);
    expect(fields).toContain('name');
    expect(fields).toContain('price');
  });

  test('getNFTCompareValue formats', () => {
    expect(getNFTCompareValue(nfts[0], 'price')).toBe('1.5 ETH');
    expect(getNFTCompareValue(nfts[0], 'name')).toBe('NFT1');
  });

  test('removeFromNFTCompare removes', () => {
    const result = removeFromNFTCompare(nfts, '1');
    expect(result).toHaveLength(0);
  });
});