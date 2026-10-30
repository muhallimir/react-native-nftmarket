import { followCreator, unfollowCreator, isFollowing, getFollowerCount, getFollowingFeed, getTopCreators } from '../utils/followCreator';

describe('NFT Follow Creator - NFT Feature 5', () => {
  test('followCreator adds creator', () => {
    const result = followCreator([], 'creator1');
    expect(result).toContain('creator1');
  });

  test('followCreator does not duplicate', () => {
    const result = followCreator(['creator1'], 'creator1');
    expect(result).toHaveLength(1);
  });

  test('unfollowCreator removes creator', () => {
    const result = unfollowCreator(['creator1', 'creator2'], 'creator1');
    expect(result).not.toContain('creator1');
    expect(result).toContain('creator2');
  });

  test('isFollowing checks membership', () => {
    expect(isFollowing(['creator1'], 'creator1')).toBe(true);
    expect(isFollowing(['creator1'], 'creator2')).toBe(false);
  });

  test('getFollowerCount counts followers', () => {
    const followers = [{ creatorId: 'c1' }, { creatorId: 'c1' }, { creatorId: 'c2' }];
    expect(getFollowerCount(followers, 'c1')).toBe(2);
  });

  test('getFollowingFeed filters by following', () => {
    const nfts = [{ creator: 'c1' }, { creator: 'c2' }, { creator: 'c1' }];
    const feed = getFollowingFeed(nfts, ['c1']);
    expect(feed).toHaveLength(2);
  });

  test('getTopCreators returns top creators', () => {
    const nfts = [
      { creator: 'Alice' }, { creator: 'Alice' }, { creator: 'Bob' },
    ];
    const top = getTopCreators(nfts, 2);
    expect(top[0].name).toBe('Alice');
    expect(top[0].count).toBe(2);
  });
});