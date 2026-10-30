// NFT Market Feature 16: Whitelist Management utilities

export function addToWhitelist(whitelist, address, tier = 'standard') {
  if (!address) return whitelist;
  if (whitelist.some(w => w.address === address)) return whitelist;
  return [...whitelist, { address, tier, addedAt: Date.now() }];
}

export function removeFromWhitelist(whitelist, address) {
  if (!address) return whitelist;
  return whitelist.filter(w => w.address !== address);
}

export function isWhitelisted(whitelist, address) {
  if (!Array.isArray(whitelist)) return false;
  return whitelist.some(w => w.address === address);
}

export function getWhitelistTier(whitelist, address) {
  if (!Array.isArray(whitelist)) return null;
  const entry = whitelist.find(w => w.address === address);
  return entry ? entry.tier : null;
}

export function getWhitelistCount(whitelist) {
  return Array.isArray(whitelist) ? whitelist.length : 0;
}

export function validateWhitelistEntry(address) {
  if (!address) return { valid: false, error: 'Address required' };
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return { valid: false, error: 'Invalid address format' };
  return { valid: true };
}