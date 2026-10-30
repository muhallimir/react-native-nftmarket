// NFT Market Feature 15: NFT Staking utilities

export function stakeNFT(nftId, staker, duration) {
  if (!nftId || !staker) return null;
  const endTime = Date.now() + (duration || 30) * 24 * 3600000;
  return {
    id: `stake-${Date.now()}`,
    nftId,
    staker,
    stakedAt: Date.now(),
    endTime,
    duration: duration || 30,
    rewards: 0,
    status: 'active',
  };
}

export function calculateStakingRewards(stake, rewardRate = 0.01) {
  if (!stake) return 0;
  const stakedDays = Math.floor((Date.now() - stake.stakedAt) / (24 * 3600000));
  return stakedDays * rewardRate;
}

export function unstakeNFT(stake) {
  if (!stake || stake.status !== 'active') return null;
  const rewards = calculateStakingRewards(stake);
  return {
    ...stake,
    status: 'unstaked',
    unstakedAt: Date.now(),
    finalRewards: rewards,
  };
}

export function isStakingActive(stake) {
  if (!stake) return false;
  return stake.status === 'active' && Date.now() < stake.endTime;
}

export function getStakingAPY(duration) {
  const baseAPY = 12; // 12% base
  if (duration >= 90) return baseAPY * 1.5;
  if (duration >= 30) return baseAPY * 1.2;
  return baseAPY;
}