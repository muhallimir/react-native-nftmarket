// NFT Market Feature 19: NFT Insurance utilities

export function createInsurancePolicy(nftId, owner, coverageAmount, premiumRate = 0.02) {
  if (!nftId || !owner || !coverageAmount || coverageAmount <= 0) return null;
  const premium = coverageAmount * premiumRate;
  const expiry = Date.now() + 365 * 24 * 3600000; // 1 year
  return {
    id: `policy-${Date.now()}`,
    nftId,
    owner,
    coverageAmount,
    premium,
    premiumRate,
    startDate: Date.now(),
    expiryDate: expiry,
    status: 'active',
    claims: [],
  };
}

export function calculatePremium(coverageAmount, riskLevel = 'medium') {
  const rates = { low: 0.01, medium: 0.02, high: 0.05 };
  const rate = rates[riskLevel] || rates.medium;
  return coverageAmount * rate;
}

export function fileClaim(policy, claimAmount, reason) {
  if (!policy || policy.status !== 'active') return null;
  if (claimAmount > policy.coverageAmount) return null;
  const claim = {
    id: `claim-${Date.now()}`,
    amount: claimAmount,
    reason,
    status: 'pending',
    filedAt: Date.now(),
  };
  return { ...policy, claims: [...policy.claims, claim] };
}

export function isPolicyActive(policy) {
  if (!policy) return false;
  return policy.status === 'active' && Date.now() < policy.expiryDate;
}

export function getPolicyStatus(policy) {
  if (!policy) return 'unknown';
  if (!isPolicyActive(policy)) return 'expired';
  return policy.status;
}