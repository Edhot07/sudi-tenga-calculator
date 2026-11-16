import { CalculationResult, ValidationResult } from '@/types/calculator';

/**
 * Validate input strings for Sudi Tenga calculation
 * Rules:
 * - All 3 inputs must be non-empty and valid numbers.
 * - P > 0
 * - R >= 0
 * - M > 0
 */
export function validateInputs(
  principalStr: string,
  percentageStr: string,
  monthsStr: string
): ValidationResult {
  const trimmedP = principalStr.trim();
  const trimmedR = percentageStr.trim();
  const trimmedM = monthsStr.trim();

  if (!trimmedP || !trimmedR || !trimmedM) {
    return {
      isValid: false,
      errorMessage: 'Please enter valid positive numbers for amount, rate and months.',
    };
  }

  const p = parseFloat(trimmedP);
  const r = parseFloat(trimmedR);
  const m = parseFloat(trimmedM);

  if (isNaN(p) || isNaN(r) || isNaN(m)) {
    return {
      isValid: false,
      errorMessage: 'Please enter valid positive numbers for amount, rate and months.',
    };
  }

  // Rules: P > 0, R >= 0, and M > 0
  if (p <= 0 || r < 0 || m <= 0) {
    return {
      isValid: false,
      errorMessage: 'Please enter valid positive numbers for amount, rate and months.',
    };
  }

  return {
    isValid: true,
    principal: p,
    percentage: r,
    months: m,
  };
}

/**
 * Calculate Monthly Interest:
 * Monthly Interest = P * (R / 100)
 */
export function calculateMonthlyInterest(principal: number, monthlyRate: number): number {
  return principal * (monthlyRate / 100);
}

/**
 * Calculate Total Accrued Interest (I):
 * I = (R / 100) * P * M
 */
export function calculateTotalInterest(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  return (monthlyRate / 100) * principal * months;
}

/**
 * Calculate Total Repayment (A):
 * A = P + I
 */
export function calculateTotalRepayment(principal: number, totalInterest: number): number {
  return principal + totalInterest;
}

/**
 * Perform complete Sudi Tenga calculation
 */
export function performCalculation(
  principal: number,
  monthlyRate: number,
  months: number
): CalculationResult {
  const monthlyInterest = calculateMonthlyInterest(principal, monthlyRate);
  const totalInterest = calculateTotalInterest(principal, monthlyRate, months);
  const totalRepayment = calculateTotalRepayment(principal, totalInterest);

  return {
    principal,
    percentage: monthlyRate,
    months,
    monthlyInterest,
    totalInterest,
    totalRepayment,
  };
}

