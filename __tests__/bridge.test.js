import { initiateBridge, getBridgeStatus, completeBridge, getBridgeFee, isChainSupported, SUPPORTED_CHAINS } from '../utils/bridge';

describe('Cross-Chain Bridge - NFT Feature 18', () => {
  test('SUPPORTED_CHAINS includes chains', () => {
    expect(SUPPORTED_CHAINS).toContain('ethereum');
    expect(SUPPORTED_CHAINS).toContain('polygon');
  });

  test('initiateBridge creates bridge', () => {
    const bridge = initiateBridge('nft1', 'ethereum', 'polygon', 'owner1');
    expect(bridge).not.toBeNull();
    expect(bridge.fromChain).toBe('ethereum');
    expect(bridge.toChain).toBe('polygon');
    expect(bridge.status).toBe('pending');
  });

  test('initiateBridge rejects same chain', () => {
    expect(initiateBridge('nft1', 'ethereum', 'ethereum', 'owner1')).toBeNull();
  });

  test('initiateBridge rejects unsupported chain', () => {
    expect(initiateBridge('nft1', 'ethereum', 'unknown', 'owner1')).toBeNull();
  });

  test('initiateBridge rejects invalid', () => {
    expect(initiateBridge(null, 'ethereum', 'polygon', 'owner1')).toBeNull();
  });

  test('completeBridge completes', () => {
    const bridge = initiateBridge('nft1', 'ethereum', 'polygon', 'owner1');
    const completed = completeBridge(bridge);
    expect(completed.status).toBe('completed');
  });

  test('getBridgeFee calculates fee', () => {
    const fee = getBridgeFee('ethereum', 'polygon');
    expect(fee).toBeGreaterThan(0);
  });

  test('isChainSupported checks', () => {
    expect(isChainSupported('ethereum')).toBe(true);
    expect(isChainSupported('unknown')).toBe(false);
  });
});