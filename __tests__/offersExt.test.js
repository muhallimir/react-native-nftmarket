import { getOfferHistory, getPendingOffers, getOfferStats, counterOffer } from '../utils/offersExt';

describe('Offers Extended - NFT Feature 23', () => {
  const offers = [
    { id: '1', status: 'pending', createdAt: 100, expiresAt: Date.now() + 100000 },
    { id: '2', status: 'accepted', createdAt: 200 },
    { id: '3', status: 'rejected', createdAt: 300 },
  ];

  test('getOfferHistory sorts by createdAt', () => {
    const history = getOfferHistory(offers);
    expect(history[0].createdAt).toBe(300);
  });

  test('getPendingOffers filters pending', () => {
    expect(getPendingOffers(offers)).toHaveLength(1);
  });

  test('getOfferStats returns stats', () => {
    const stats = getOfferStats(offers);
    expect(stats.total).toBe(3);
    expect(stats.pending).toBe(1);
    expect(stats.accepted).toBe(1);
  });

  test('counterOffer creates counter', () => {
    const counter = counterOffer(offers[0], 2.0);
    expect(counter.amount).toBe(2.0);
    expect(counter.counterOffer).toBe(true);
    expect(counter.originalAmount).toBe(0);
  });
});