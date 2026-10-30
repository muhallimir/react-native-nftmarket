import { createLazyMint, mintLazyNFT, isLazyMinted, getLazyMintFee, getUnmintedLazyNFTs } from '../utils/lazyMint';

describe('Lazy Minting - NFT Feature 14', () => {
  test('createLazyMint creates lazy mint', () => {
    const lazy = createLazyMint({ name: 'NFT', image: 'img.jpg' }, 'creator1');
    expect(lazy).not.toBeNull();
    expect(lazy.minted).toBe(false);
  });

  test('createLazyMint rejects invalid', () => {
    expect(createLazyMint({ name: '' }, 'creator1')).toBeNull();
    expect(createLazyMint({ name: 'NFT' }, null)).toBeNull();
  });

  test('mintLazyNFT mints', () => {
    const lazy = createLazyMint({ name: 'NFT', image: 'img.jpg' }, 'creator1');
    const minted = mintLazyNFT(lazy, 'buyer1');
    expect(minted.minted).toBe(true);
    expect(minted.mintedBy).toBe('buyer1');
    expect(minted.tokenId).toBeDefined();
  });

  test('mintLazyNFT rejects already minted', () => {
    const lazy = createLazyMint({ name: 'NFT', image: 'img.jpg' }, 'creator1');
    const minted = mintLazyNFT(lazy, 'buyer1');
    expect(mintLazyNFT(minted, 'buyer2')).toBeNull();
  });

  test('isLazyMinted checks status', () => {
    const lazy = createLazyMint({ name: 'NFT', image: 'img.jpg' }, 'creator1');
    expect(isLazyMinted(lazy)).toBe(false);
  });

  test('getLazyMintFee calculates fee', () => {
    expect(getLazyMintFee(0.01, 0.005)).toBe(0.015);
  });

  test('getUnmintedLazyNFTs filters', () => {
    const nfts = [{ minted: false }, { minted: true }];
    expect(getUnmintedLazyNFTs(nfts)).toHaveLength(1);
  });
});