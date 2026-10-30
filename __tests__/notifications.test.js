import { createNotification, getUnreadNotifications, markNotificationRead, getNotificationIcon, getUnreadCount, NOTIFICATION_TYPES } from '../utils/notifications';

describe('Notifications - NFT Feature 24', () => {
  test('NOTIFICATION_TYPES includes types', () => {
    expect(NOTIFICATION_TYPES).toContain('sale');
    expect(NOTIFICATION_TYPES).toContain('mint');
  });

  test('createNotification creates notification', () => {
    const notif = createNotification('sale', 'NFT sold!', 'user1');
    expect(notif).not.toBeNull();
    expect(notif.type).toBe('sale');
    expect(notif.read).toBe(false);
  });

  test('createNotification rejects invalid type', () => {
    expect(createNotification('invalid', 'msg', 'user1')).toBeNull();
  });

  test('getUnreadNotifications filters', () => {
    const notifs = [{ read: false }, { read: true }];
    expect(getUnreadNotifications(notifs)).toHaveLength(1);
  });

  test('markNotificationRead marks read', () => {
    const notif = { read: false };
    const result = markNotificationRead(notif);
    expect(result.read).toBe(true);
  });

  test('getNotificationIcon returns icon', () => {
    expect(getNotificationIcon('sale')).toBe('💰');
  });

  test('getUnreadCount counts', () => {
    const notifs = [{ read: false }, { read: false }, { read: true }];
    expect(getUnreadCount(notifs)).toBe(2);
  });
});