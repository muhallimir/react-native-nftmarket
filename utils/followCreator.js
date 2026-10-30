// NFT Follow Creator utilities - pure functions for TDD

export function followCreator(following, creatorId) {
  if (!creatorId) return following;
  if (following.includes(creatorId)) return following;
  return [...following, creatorId];
}

export function unfollowCreator(following, creatorId) {
  if (!creatorId) return following;
  return following.filter(id => id !== creatorId);
}

export function isFollowing(following, creatorId) {
  if (!Array.isArray(following)) return false;
  return following.includes(creatorId);
}

export function getFollowerCount(followers, creatorId) {
  if (!Array.isArray(followers)) return 0;
  return followers.filter(f => f.creatorId === creatorId).length;
}

export function getFollowingFeed(nfts, following) {
  if (!Array.isArray(nfts) || !Array.isArray(following)) return [];
  return nfts.filter(nft => following.includes(nft.creator));
}

export function getTopCreators(nfts, limit = 5) {
  if (!Array.isArray(nfts)) return [];
  const counts = {};
  nfts.forEach(nft => {
    const creator = nft.creator || 'Unknown';
    counts[creator] = (counts[creator] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}