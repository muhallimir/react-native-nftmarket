import { createLoan, calculateLoanRepayment, isLoanOverdue, repayLoan, getLoanStatus, calculateLTV } from '../utils/lending';

describe('NFT Lending - NFT Feature 17', () => {
  test('createLoan creates loan', () => {
    const loan = createLoan('nft1', 'borrower1', 1.0, 7, 5);
    expect(loan).not.toBeNull();
    expect(loan.principal).toBe(1.0);
    expect(loan.status).toBe('active');
  });

  test('createLoan rejects invalid', () => {
    expect(createLoan(null, 'borrower', 1.0)).toBeNull();
    expect(createLoan('nft1', null, 1.0)).toBeNull();
    expect(createLoan('nft1', 'borrower', 0)).toBeNull();
  });

  test('calculateLoanRepayment calculates', () => {
    const loan = createLoan('nft1', 'borrower1', 1.0, 7, 5);
    const repayment = calculateLoanRepayment(loan);
    expect(repayment).toBeGreaterThan(1.0);
  });

  test('repayLoan repays', () => {
    const loan = createLoan('nft1', 'borrower1', 1.0, 7, 5);
    const repaid = repayLoan(loan);
    expect(repaid.repaid).toBe(true);
    expect(repaid.repaymentAmount).toBeDefined();
  });

  test('repayLoan rejects already repaid', () => {
    const loan = createLoan('nft1', 'borrower1', 1.0, 7, 5);
    const repaid = repayLoan(loan);
    expect(repayLoan(repaid)).toBeNull();
  });

  test('getLoanStatus returns status', () => {
    const loan = createLoan('nft1', 'borrower1', 1.0, 7, 5);
    expect(getLoanStatus(loan)).toBe('active');
  });

  test('calculateLTV calculates', () => {
    expect(calculateLTV(10, 5)).toBe(50);
    expect(calculateLTV(0, 5)).toBe(0);
  });
});