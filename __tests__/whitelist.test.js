import { addToWhitelist, removeFromWhitelist, isWhitelisted, getWhitelistTier, getWhitelistCount, validateWhitelistEntry } from '../utils/whitelist';

describe('Whitelist - NFT Feature 16', () => {
  test('addToWhitelist adds address', () => {
    const wl = addToWhitelist([], '0x1234567890123456789012345678901234567890', 'vip');
    expect(wl).toHaveLength(1);
  });

  test('addToWhitelist does not duplicate', () => {
    const addr = '0x1234567890123456789012345678901234567890';
    const wl = addToWhitelist([ { address: addr, tier: 'standard', addedAt: 0 } ], addr);
    expect(wl).toHaveLength(1);
  });

  test('removeFromWhitelist removes', () => {
    const addr = '0x1234567890123456789012345678901234567890';
    const wl = removeFromWhitelist([{ address: addr }], addr);
    expect(wl).toHaveLength(0);
  });

  test('isWhitelisted checks', () => {
    const addr = '0x1234567890123456789012345678901234567890';
    expect(isWhitelisted([{ address: addr }], addr)).toBe(true);
    expect(isWhitelisted([], addr)).toBe(false);
  });

  test('getWhitelistTier returns tier', () => {
    const addr = '0x1234567890123456789012345678901234567890';
    expect(getWhitelistTier([{ address: addr, tier: 'vip' }], addr)).toBe('vip');
  });

  test('getWhitelistCount returns count', () => {
    expect(getWhitelistCount([{ address: 'a' }, { address: 'b' }])).toBe(2);
  });

  test('validateWhitelistEntry validates', () => {
    expect(validateWhitelistEntry('0x1234567890123456789012345678901234567890').valid).toBe(true);
    expect(validateWhitelistEntry('invalid').valid).toBe(false);
    expect(validateWhitelistEntry('').valid).toBe(false);
  });
});