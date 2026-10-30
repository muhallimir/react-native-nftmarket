// NFT Minting utilities - pure functions for TDD

export const MINT_STEPS = ['upload', 'details', 'preview', 'confirm', 'minting', 'complete'];

export function validateMintData(data) {
  const errors = [];
  if (!data || !data.name || data.name.trim().length === 0) errors.push('Name is required');
  if (!data || !data.description || data.description.trim().length === 0) errors.push('Description is required');
  if (!data || !data.image) errors.push('Image is required');
  if (data && data.royalty != null && (data.royalty < 0 || data.royalty > 10)) errors.push('Royalty must be 0-10%');
  return { valid: errors.length === 0, errors };
}

export function createMintPayload(data) {
  if (!data) return null;
  const validation = validateMintData(data);
  if (!validation.valid) return null;
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    image: data.image,
    collection: data.collection || 'Uncategorized',
    royalty: data.royalty || 0,
    properties: data.properties || {},
    createdAt: Date.now(),
  };
}

export function getMintStepIndex(step) {
  const idx = MINT_STEPS.indexOf(step);
  return idx >= 0 ? idx : 0;
}

export function getNextMintStep(current) {
  const idx = getMintStepIndex(current);
  if (idx < MINT_STEPS.length - 1) return MINT_STEPS[idx + 1];
  return MINT_STEPS[MINT_STEPS.length - 1];
}

export function getMintProgress(step) {
  const idx = getMintStepIndex(step);
  return Math.round(((idx + 1) / MINT_STEPS.length) * 100);
}

export function formatMintCost(gasFee, mintPrice) {
  const total = (gasFee || 0) + (mintPrice || 0);
  return `${total.toFixed(4)} ETH`;
}