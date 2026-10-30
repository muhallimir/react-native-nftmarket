import { stakeNFT, calculateStakingRewards, unstakeNFT, isStakingActive, getStakingAPY } from '../utils/staking';

describe('NFT Staking - NFT Feature 15', () => {
  test('stakeNFT creates stake', () => {
    const stake = stakeNFT('nft1', 'staker1', 30);
    expect(stake).not.toBeNull();
    expect(stake.status).toBe('active');
    expect(stake.duration).toBe(30);
  });

  test('stakeNFT rejects invalid', () => {
    expect(stakeNFT(null, 'staker1')).toBeNull();
    expect(stakeNFT('nft1', null)).toBeNull();
  });

  test('calculateStakingRewards returns rewards', () => {
    const stake = { stakedAt: Date.now() - 5 * 24 * 3600000 };
    const rewards = calculateStakingRewards(stake, 0.01);
    expect(rewards).toBeGreaterThanOrEqual(0);
  });

  test('unstakeNFT unstakes', () => {
    const stake = stakeNFT('nft1', 'staker1', 30);
    const unstaked = unstakeNFT(stake);
    expect(unstaked.status).toBe('unstaked');
    expect(unstaked.finalRewards).toBeDefined();
  });

  test('isStakingActive checks active', () => {
    const stake = stakeNFT('nft1', 'staker1', 30);
    expect(isStakingActive(stake)).toBe(true);
  });

  test('getStakingAPY returns APY', () => {
    expect(getStakingAPY(30)).toBeCloseTo(14.4);
    expect(getStakingAPY(90)).toBe(18);
    expect(getStakingAPY(7)).toBe(12);
  });
});