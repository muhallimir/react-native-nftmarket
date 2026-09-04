// Rarity scoring: derives a 0-100 score from NFT traits by combining
// per-trait rarity heuristics. The score bucket into tiers.
const TIER_TABLE = [
  { tier: "Common", min: 0, max: 39, color: "#9AA3AB", icon: "C" },
  { tier: "Rare", min: 40, max: 59, color: "#3B82F6", icon: "R" },
  { tier: "Epic", min: 60, max: 79, color: "#8B5CF6", icon: "E" },
  { tier: "Legendary", min: 80, max: 100, color: "#F59E0B", icon: "L" },
];

// Deterministic per-trait rarity: hashes the value string into a 0-99 number.
const hashPercent = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h % 100;
};

export const computeRarity = (nft) => {
  if (!nft || !Array.isArray(nft.traits) || nft.traits.length === 0) {
    return {
      score: 25,
      tier: TIER_TABLE[0],
      breakdown: [],
    };
  }
  // Each trait contributes: rarity (inverse of how "common" the value is) + bid pressure.
  const breakdown = nft.traits.map((trait) => {
    const rarity = 100 - hashPercent(`${trait.trait_type}:${trait.value}`);
    return {
      label: `${trait.trait_type}: ${trait.value}`,
      rarity,
    };
  });
  const traitAvg = breakdown.reduce((acc, b) => acc + b.rarity, 0) / breakdown.length;
  const bidCount = Array.isArray(nft.bids) ? nft.bids.length : 0;
  const bidBoost = Math.min(20, bidCount * 3);
  const score = Math.max(0, Math.min(100, Math.round(traitAvg * 0.8 + bidBoost)));
  const tier =
    TIER_TABLE.find((t) => score >= t.min && score <= t.max) || TIER_TABLE[0];
  return { score, tier, breakdown };
};

export const RARITY_TIERS = TIER_TABLE;
