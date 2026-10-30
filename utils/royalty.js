// NFT Royalty Display utilities - pure functions for TDD

export function calculateRoyalty(salePrice, royaltyPercent) {
  if (salePrice == null || royaltyPercent == null) return 0;
  return (salePrice * royaltyPercent) / 100;
}

export function getRoyaltyBreakdown(salePrice, royaltyPercent, platformFee = 2.5) {
  const royalty = calculateRoyalty(salePrice, royaltyPercent);
  const platform = (salePrice * platformFee) / 100;
  const seller = salePrice - royalty - platform;
  return {
    salePrice,
    royalty,
    platformFee: platform,
    sellerProceeds: seller,
    royaltyPercent,
    platformFeePercent: platformFee,
  };
}

export function formatRoyalty(percent) {
  if (percent == null) return '0%';
  return `${percent}%`;
}

export function getRoyaltyTier(percent) {
  if (percent == null || percent <= 0) return 'none';
  if (percent <= 2.5) return 'low';
  if (percent <= 5) return 'standard';
  if (percent <= 7.5) return 'high';
  return 'premium';
}

export function validateRoyalty(percent) {
  if (percent == null) return { valid: true, value: 0 };
  if (percent < 0 || percent > 10) return { valid: false, error: 'Royalty must be 0-10%' };
  return { valid: true, value: percent };
}