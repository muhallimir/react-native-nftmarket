// NFT Market Feature 24: NFT Notifications utilities

export const NOTIFICATION_TYPES = ['sale', 'bid', 'offer', 'follow', 'price_drop', 'mint'];

export function createNotification(type, message, userId) {
  if (!NOTIFICATION_TYPES.includes(type)) return null;
  return {
    id: `notif-${Date.now()}`,
    type,
    message,
    userId,
    read: false,
    createdAt: Date.now(),
  };
}

export function getUnreadNotifications(notifications) {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter(n => !n.read);
}

export function markNotificationRead(notification) {
  if (!notification) return null;
  return { ...notification, read: true, readAt: Date.now() };
}

export function getNotificationIcon(type) {
  const icons = { sale: '💰', bid: '🔨', offer: '📋', follow: '👤', price_drop: '📉', mint: '✨' };
  return icons[type] || '📄';
}

export function getUnreadCount(notifications) {
  return getUnreadNotifications(notifications).length;
}