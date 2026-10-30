import { createPriceAlert, checkPriceAlert, triggerAlert, getActiveAlerts, formatPriceAlert } from '../utils/priceAlert';

describe('Price Alert - NFT Feature 28', () => {
  test('createPriceAlert creates alert', () => {
    const alert = createPriceAlert('nft1', 1.0, 'user1', 'below');
    expect(alert).not.toBeNull();
    expect(alert.targetPrice).toBe(1.0);
    expect(alert.type).toBe('below');
  });

  test('createPriceAlert rejects invalid', () => {
    expect(createPriceAlert(null, 1.0)).toBeNull();
    expect(createPriceAlert('nft1', 0)).toBeNull();
  });

  test('checkPriceAlert checks below', () => {
    const alert = createPriceAlert('nft1', 1.0, 'user1', 'below');
    expect(checkPriceAlert(alert, 0.9)).toBe(true);
    expect(checkPriceAlert(alert, 1.5)).toBe(false);
  });

  test('triggerAlert triggers', () => {
    const alert = createPriceAlert('nft1', 1.0, 'user1', 'below');
    const triggered = triggerAlert(alert);
    expect(triggered.triggered).toBe(true);
    expect(triggered.active).toBe(false);
  });

  test('getActiveAlerts filters', () => {
    const alerts = [{ nftId: 'nft1', active: true, triggered: false }];
    expect(getActiveAlerts(alerts, 'nft1')).toHaveLength(1);
  });

  test('formatPriceAlert formats', () => {
    const alert = createPriceAlert('nft1', 1.0, 'user1', 'below');
    expect(formatPriceAlert(alert)).toContain('below');
  });
});