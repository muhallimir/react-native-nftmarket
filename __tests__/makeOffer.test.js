import { createOffer, isOfferExpired, canAcceptOffer, acceptOffer, rejectOffer, cancelOffer, getOfferStatus, sortOffersByAmount, getHighestOffer, OFFER_STATUSES } from '../utils/makeOffer';

describe('NFT Make Offer - NFT Feature 4', () => {
  test('OFFER_STATUSES includes all', () => {
    expect(OFFER_STATUSES).toContain('pending');
    expect(OFFER_STATUSES).toContain('accepted');
  });

  test('createOffer creates valid offer', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    expect(offer).not.toBeNull();
    expect(offer.nftId).toBe('nft1');
    expect(offer.amount).toBe(1.5);
    expect(offer.status).toBe('pending');
  });

  test('createOffer returns null for invalid', () => {
    expect(createOffer(null, 'buyer', 1)).toBeNull();
    expect(createOffer('nft', null, 1)).toBeNull();
    expect(createOffer('nft', 'buyer', 0)).toBeNull();
    expect(createOffer('nft', 'buyer', -1)).toBeNull();
  });

  test('canAcceptOffer checks conditions', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    expect(canAcceptOffer(offer)).toBe(true);
  });

  test('acceptOffer accepts valid offer', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    const accepted = acceptOffer(offer);
    expect(accepted.status).toBe('accepted');
    expect(accepted.acceptedAt).toBeDefined();
  });

  test('rejectOffer rejects pending offer', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    const rejected = rejectOffer(offer);
    expect(rejected.status).toBe('rejected');
  });

  test('cancelOffer cancels by buyer', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    const cancelled = cancelOffer(offer, 'buyer1');
    expect(cancelled.status).toBe('cancelled');
  });

  test('cancelOffer fails for wrong buyer', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    expect(cancelOffer(offer, 'buyer2')).toBeNull();
  });

  test('getOfferStatus returns status', () => {
    const offer = createOffer('nft1', 'buyer1', 1.5);
    expect(getOfferStatus(offer)).toBe('pending');
  });

  test('sortOffersByAmount sorts desc', () => {
    const offers = [{ amount: 1 }, { amount: 3 }, { amount: 2 }];
    const sorted = sortOffersByAmount(offers);
    expect(sorted[0].amount).toBe(3);
  });

  test('getHighestOffer returns highest', () => {
    const offers = [{ amount: 1 }, { amount: 3 }];
    expect(getHighestOffer(offers).amount).toBe(3);
    expect(getHighestOffer([])).toBeNull();
  });
});