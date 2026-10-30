import { createBundle, validateBundle, getBundleSavings } from '../utils/bundles';

describe('NFT Bundles - NFT Feature 13', () => {
  const nfts = [{ _id: '1', price: 1.5 }, { _id: '2', price: 2.0 }];

  test('createBundle creates bundle', () => {
    const bundle = createBundle(nfts, 3.0, 'My Bundle');
    expect(bundle).not.toBeNull();
    expect(bundle.count).toBe(2);
    expect(bundle.savings).toBe(0.5);
  });

  test('createBundle rejects invalid', () => {
    expect(createBundle([], 3.0)).toBeNull();
    expect(createBundle(nfts, 0)).toBeNull();
  });

  test('validateBundle validates', () => {
    const result = validateBundle(nfts, 3.0);
    expect(result.valid).toBe(true);
    expect(validateBundle([{ _id: '1' }], 1.0).valid).toBe(false);
  });

  test('getBundleSavings returns savings', () => {
    const bundle = createBundle(nfts, 3.0);
    expect(getBundleSavings(bundle)).toBe(0.5);
  });
});