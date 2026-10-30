// NFT Market Feature 14: Lazy Minting utilities

export function createLazyMint(nftData, creator) {
  if (!nftData || !nftData.name || !creator) return null;
  return {
    id: `lazy-${Date.now()}`,
    ...nftData,
    creator,
    minted: false,
    mintedAt: null,
    mintedBy: null,
    createdAt: Date.now(),
  };
}

export function mintLazyNFT(lazyNft, buyer) {
  if (!lazyNft || lazyNft.minted) return null;
  return {
    ...lazyNft,
    minted: true,
    mintedAt: Date.now(),
    mintedBy: buyer,
    tokenId: `token-${Date.now()}`,
  };
}

export function isLazyMinted(nft) {
  return !!(nft && nft.minted);
}

export function getLazyMintFee(gasEstimate, platformFee = 0.01) {
  return gasEstimate + platformFee;
}

export function getUnmintedLazyNFTs(nfts) {
  if (!Array.isArray(nfts)) return [];
  return nfts.filter(n => !n.minted);
}