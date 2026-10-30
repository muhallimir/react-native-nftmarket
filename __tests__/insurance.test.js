import { createInsurancePolicy, calculatePremium, fileClaim, isPolicyActive, getPolicyStatus } from '../utils/insurance';

describe('NFT Insurance - NFT Feature 19', () => {
  test('createInsurancePolicy creates policy', () => {
    const policy = createInsurancePolicy('nft1', 'owner1', 10);
    expect(policy).not.toBeNull();
    expect(policy.coverageAmount).toBe(10);
    expect(policy.status).toBe('active');
  });

  test('createInsurancePolicy rejects invalid', () => {
    expect(createInsurancePolicy(null, 'owner1', 10)).toBeNull();
    expect(createInsurancePolicy('nft1', null, 10)).toBeNull();
    expect(createInsurancePolicy('nft1', 'owner1', 0)).toBeNull();
  });

  test('calculatePremium calculates', () => {
    expect(calculatePremium(100, 'low')).toBe(1);
    expect(calculatePremium(100, 'medium')).toBe(2);
    expect(calculatePremium(100, 'high')).toBe(5);
  });

  test('fileClaim files claim', () => {
    const policy = createInsurancePolicy('nft1', 'owner1', 10);
    const updated = fileClaim(policy, 5, 'Lost NFT');
    expect(updated.claims).toHaveLength(1);
    expect(updated.claims[0].status).toBe('pending');
  });

  test('fileClaim rejects over coverage', () => {
    const policy = createInsurancePolicy('nft1', 'owner1', 10);
    expect(fileClaim(policy, 15, 'Lost')).toBeNull();
  });

  test('isPolicyActive checks active', () => {
    const policy = createInsurancePolicy('nft1', 'owner1', 10);
    expect(isPolicyActive(policy)).toBe(true);
  });

  test('getPolicyStatus returns status', () => {
    const policy = createInsurancePolicy('nft1', 'owner1', 10);
    expect(getPolicyStatus(policy)).toBe('active');
  });
});