// NFT Market Feature 17: NFT Lending utilities

export function createLoan(nftId, borrower, amount, duration, interestRate) {
  if (!nftId || !borrower || !amount || amount <= 0) return null;
  const endTime = Date.now() + (duration || 7) * 24 * 3600000;
  return {
    id: `loan-${Date.now()}`,
    nftId,
    borrower,
    principal: amount,
    interestRate: interestRate || 5,
    duration: duration || 7,
    startTime: Date.now(),
    endTime,
    status: 'active',
    repaid: false,
  };
}

export function calculateLoanRepayment(loan) {
  if (!loan) return 0;
  const interest = (loan.principal * loan.interestRate * loan.duration) / (100 * 365);
  return loan.principal + interest;
}

export function isLoanOverdue(loan) {
  if (!loan) return false;
  return !loan.repaid && Date.now() > loan.endTime;
}

export function repayLoan(loan) {
  if (!loan || loan.repaid) return null;
  return { ...loan, repaid: true, repaidAt: Date.now(), repaymentAmount: calculateLoanRepayment(loan) };
}

export function getLoanStatus(loan) {
  if (!loan) return 'unknown';
  if (loan.repaid) return 'repaid';
  if (isLoanOverdue(loan)) return 'overdue';
  return 'active';
}

export function calculateLTV(nftValue, loanAmount) {
  if (!nftValue || nftValue <= 0) return 0;
  return (loanAmount / nftValue) * 100;
}