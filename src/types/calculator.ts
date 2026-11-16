export interface Calculation {
  id: string; // unique ID or timestamp
  principal: number;
  percentage: number; // monthly rate
  months: number;
  total: number;
  interest: number;
  date: string; // e.g., formatted using en-IN locale
}

export interface CalculationResult {
  principal: number;
  percentage: number;
  months: number;
  monthlyInterest: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface CalculationInput {
  principal: string;
  percentage: string;
  months: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  principal?: number;
  percentage?: number;
  months?: number;
}

