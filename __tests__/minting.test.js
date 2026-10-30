import { validateMintData, createMintPayload, getMintStepIndex, getNextMintStep, getMintProgress, formatMintCost, MINT_STEPS } from '../utils/minting';

describe('NFT Minting - NFT Feature 7', () => {
  test('MINT_STEPS includes all steps', () => {
    expect(MINT_STEPS).toContain('upload');
    expect(MINT_STEPS).toContain('complete');
  });

  test('validateMintData validates valid data', () => {
    const result = validateMintData({ name: 'NFT', description: 'Desc', image: 'img.jpg' });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validateMintData rejects missing name', () => {
    const result = validateMintData({ description: 'Desc', image: 'img.jpg' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  test('validateMintData rejects high royalty', () => {
    const result = validateMintData({ name: 'NFT', description: 'Desc', image: 'img.jpg', royalty: 15 });
    expect(result.valid).toBe(false);
  });

  test('createMintPayload creates payload', () => {
    const payload = createMintPayload({ name: 'NFT', description: 'Desc', image: 'img.jpg' });
    expect(payload).not.toBeNull();
    expect(payload.name).toBe('NFT');
  });

  test('createMintPayload returns null for invalid', () => {
    expect(createMintPayload({ name: '' })).toBeNull();
  });

  test('getMintStepIndex returns index', () => {
    expect(getMintStepIndex('upload')).toBe(0);
    expect(getMintStepIndex('complete')).toBe(5);
  });

  test('getNextMintStep returns next', () => {
    expect(getNextMintStep('upload')).toBe('details');
    expect(getNextMintStep('complete')).toBe('complete');
  });

  test('getMintProgress returns percentage', () => {
    expect(getMintProgress('upload')).toBe(17);
    expect(getMintProgress('complete')).toBe(100);
  });

  test('formatMintCost formats correctly', () => {
    expect(formatMintCost(0.01, 0.1)).toBe('0.1100 ETH');
  });
});