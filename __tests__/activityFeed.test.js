import { createActivity, filterActivities, sortActivities, getActivityIcon, getActivityMessage, getRecentActivities, ACTIVITY_TYPES } from '../utils/activityFeed';

describe('NFT Activity Feed - NFT Feature 2', () => {
  test('ACTIVITY_TYPES includes all types', () => {
    expect(ACTIVITY_TYPES).toContain('sale');
    expect(ACTIVITY_TYPES).toContain('mint');
  });

  test('createActivity creates valid activity', () => {
    const act = createActivity('sale', { _id: '1', name: 'NFT1' }, 'Alice', 'Bob', 1.5);
    expect(act).not.toBeNull();
    expect(act.type).toBe('sale');
    expect(act.nftName).toBe('NFT1');
    expect(act.price).toBe(1.5);
  });

  test('createActivity returns null for invalid type', () => {
    expect(createActivity('invalid', { _id: '1' })).toBeNull();
  });

  test('filterActivities filters by type', () => {
    const acts = [
      { type: 'sale', timestamp: 1 },
      { type: 'bid', timestamp: 2 },
    ];
    expect(filterActivities(acts, 'sale')).toHaveLength(1);
    expect(filterActivities(acts, 'all')).toHaveLength(2);
  });

  test('sortActivities sorts by timestamp desc', () => {
    const acts = [{ type: 'sale', timestamp: 100 }, { type: 'bid', timestamp: 200 }];
    const sorted = sortActivities(acts);
    expect(sorted[0].timestamp).toBe(200);
  });

  test('getActivityIcon returns icon', () => {
    expect(getActivityIcon('sale')).toBe('💰');
    expect(getActivityIcon('unknown')).toBe('📄');
  });

  test('getActivityMessage formats correctly', () => {
    const msg = getActivityMessage({ type: 'sale', nftName: 'NFT1', price: 1.5 });
    expect(msg).toContain('NFT1');
    expect(msg).toContain('1.5');
  });

  test('getRecentActivities limits results', () => {
    const acts = Array.from({ length: 20 }, (_, i) => ({ type: 'sale', timestamp: i }));
    expect(getRecentActivities(acts, 5)).toHaveLength(5);
  });
});