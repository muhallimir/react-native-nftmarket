// NFT Market Feature 28: Price Alert utilities

export function createPriceAlert(nftId, targetPrice, userId, type = 'below') {
  if (!nftId || !targetPrice || targetPrice <= 0) return null;
  return {
    id: `alert-${Date.now()}`,
    nftId,
    targetPrice,
    userId,
    type, // 'below' or 'above'
    active: true,
    createdAt: Date.now(),
    triggered: false,
  };
}

export function checkPriceAlert(alert, currentPrice) {
  if (!alert || !alert.active) return false;
  if (alert.type === 'below') return currentPrice <= alert.targetPrice;
  if (alert.type === 'above') return currentPrice >= alert.targetPrice;
  return false;
}

export function triggerAlert(alert) {
  if (!alert) return null;
  return { ...alert, triggered: true, triggeredAt: Date.now(), active: false };
}

export function getActiveAlerts(alerts, nftId) {
  if (!Array.isArray(alerts)) return [];
  return alerts.filter(a => a.nftId === nftId && a.active && !a.triggered);
}

export function formatPriceAlert(alert) {
  if (!alert) return '';
  return `Alert when price goes ${alert.type} ${alert.targetPrice} ETH`;
}