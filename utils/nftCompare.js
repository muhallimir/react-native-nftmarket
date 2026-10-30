// NFT Market Feature 27: NFT Comparison utilities

export function addToNFTCompare(current, nft, max = 3) {
  if (!nft) return current;
  if (current.some(n => (n._id || n.id) === (nft._id || nft.id))) return current;
  if (current.length >= max) return current;
  return [...current, nft];
}

export function getNFTCompareFields(nfts) {
  if (!Array.isArray(nfts) || nfts.length === 0) return [];
  return ['name', 'price', 'collection', 'creator', 'rarity', 'owner'];
}

export function getNFTCompareValue(nft, field) {
  if (!nft) return 'N/A';
  const val = nft[field];
  if (val === undefined || val === null) return 'N/A';
  if (field === 'price') return `${val} ETH`;
  return String(val);
}

export function removeFromNFTCompare(current, nftId) {
  return current.filter(n => (n._id || n.id) !== nftId);
}