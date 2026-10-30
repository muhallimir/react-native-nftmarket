// NFT Make Offer utilities - pure functions for TDD

export const OFFER_STATUSES = ['pending', 'accepted', 'rejected', 'expired', 'cancelled'];

export function createOffer(nftId, buyer, amount, expiryHours = 24) {
  if (!nftId || !buyer || !amount || amount <= 0) return null;
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + expiryHours);
  return {
    id: `offer-${Date.now()}`,
    nftId,
    buyer,
    amount: Number(amount),
    status: 'pending',
    createdAt: Date.now(),
    expiresAt: expiry.getTime(),
  };
}

export function isOfferExpired(offer) {
  if (!offer) return true;
  return Date.now() > offer.expiresAt;
}

export function canAcceptOffer(offer) {
  if (!offer) return false;
  if (offer.status !== 'pending') return false;
  return !isOfferExpired(offer);
}

export function acceptOffer(offer) {
  if (!canAcceptOffer(offer)) return null;
  return { ...offer, status: 'accepted', acceptedAt: Date.now() };
}

export function rejectOffer(offer) {
  if (!offer || offer.status !== 'pending') return null;
  return { ...offer, status: 'rejected', rejectedAt: Date.now() };
}

export function cancelOffer(offer, buyer) {
  if (!offer || offer.buyer !== buyer) return null;
  if (offer.status !== 'pending') return null;
  return { ...offer, status: 'cancelled', cancelledAt: Date.now() };
}

export function getOfferStatus(offer) {
  if (!offer) return 'unknown';
  if (isOfferExpired(offer) && offer.status === 'pending') return 'expired';
  return offer.status;
}

export function sortOffersByAmount(offers, order = 'desc') {
  if (!Array.isArray(offers)) return [];
  const sorted = [...offers].sort((a, b) => b.amount - a.amount);
  return order === 'asc' ? sorted.reverse() : sorted;
}

export function getHighestOffer(offers) {
  if (!Array.isArray(offers) || offers.length === 0) return null;
  return sortOffersByAmount(offers)[0];
}