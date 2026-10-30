// NFT Market Feature 18: Cross-Chain Bridge utilities

export const SUPPORTED_CHAINS = ['ethereum', 'polygon', 'solana', 'bsc', 'arbitrum'];

export function initiateBridge(nftId, fromChain, toChain, owner) {
  if (!nftId || !fromChain || !toChain || !owner) return null;
  if (!SUPPORTED_CHAINS.includes(fromChain) || !SUPPORTED_CHAINS.includes(toChain)) return null;
  if (fromChain === toChain) return null;
  return {
    id: `bridge-${Date.now()}`,
    nftId,
    fromChain,
    toChain,
    owner,
    status: 'pending',
    createdAt: Date.now(),
    estimatedTime: 15, // minutes
  };
}

export function getBridgeStatus(bridge) {
  if (!bridge) return 'unknown';
  return bridge.status || 'pending';
}

export function completeBridge(bridge) {
  if (!bridge || bridge.status !== 'pending') return null;
  return { ...bridge, status: 'completed', completedAt: Date.now() };
}

export function getBridgeFee(fromChain, toChain) {
  const baseFees = { ethereum: 0.01, polygon: 0.001, solana: 0.0001, bsc: 0.005, arbitrum: 0.002 };
  return (baseFees[fromChain] || 0.01) + (baseFees[toChain] || 0.01);
}

export function isChainSupported(chain) {
  return SUPPORTED_CHAINS.includes(chain);
}