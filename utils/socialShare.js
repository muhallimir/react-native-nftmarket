// NFT Social Sharing utilities - pure functions for TDD

export function generateShareUrl(nft, baseUrl = 'https://nftmarket.app') {
  if (!nft) return '';
  const id = nft._id || nft.id;
  return `${baseUrl}/nft/${id}`;
}

export function generateShareText(nft) {
  if (!nft) return '';
  return `Check out ${nft.name || 'this NFT'} on NFT Market! ${nft.price ? `Price: ${nft.price} ETH` : ''}`;
}

export function getSharePlatforms() {
  return [
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/intent/tweet' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php' },
    { name: 'Discord', icon: 'discord', url: 'https://discord.com' },
    { name: 'Telegram', icon: 'telegram', url: 'https://t.me/share/url' },
    { name: 'Copy Link', icon: 'link', url: null },
  ];
}

export function formatShareMessage(nft, platform) {
  if (!nft) return '';
  const url = generateShareUrl(nft);
  const text = generateShareText(nft);
  switch (platform) {
    case 'Twitter': return `${text}\n${url}`;
    case 'Facebook': return url;
    case 'Telegram': return `${text}\n${url}`;
    default: return url;
  }
}

export function getShareCount(nft) {
  if (!nft) return 0;
  return nft.shareCount || 0;
}

export function incrementShareCount(nft) {
  if (!nft) return nft;
  return { ...nft, shareCount: (nft.shareCount || 0) + 1 };
}