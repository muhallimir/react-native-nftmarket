// NFT Market Feature 23: NFT Offers Extended utilities

export function getOfferHistory(offers) {
  if (!Array.isArray(offers)) return [];
  return offers.sort((a, b) => b.createdAt - a.createdAt);
}

export function getPendingOffers(offers) {
  if (!Array.isArray(offers)) return [];
  return offers.filter(o => o.status === 'pending' && !isExpired(o));
}

export function isExpired(offer) {
  if (!offer) return true;
  return Date.now() > offer.expiresAt;
}

export function getOfferStats(offers) {
  if (!Array.isArray(offers)) return { total: 0, pending: 0, accepted: 0, rejected: 0 };
  return {
    total: offers.length,
    pending: offers.filter(o => o.status === 'pending').length,
    accepted: offers.filter(o => o.status === 'accepted').length,
    rejected: offers.filter(o => o.status === 'rejected').length,
  };
}

export function counterOffer(originalOffer, newAmount) {
  if (!originalOffer || newAmount <= 0) return null;
  return {
    ...originalOffer,
    amount: newAmount,
    status: 'pending',
    counterOffer: true,
    originalAmount: originalOffer.amount || 0,
  };
}