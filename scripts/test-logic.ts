import {
  calculateMonthlyInterest,
  calculateTotalInterest,
  calculateTotalRepayment,
  performCalculation,
  validateInputs,
} from '../src/utils/calculator';
import {
  formatCurrency,
  formatDateTime,
  formatIndianNumber,
  formatMonths,
  formatMonthsCompact,
} from '../src/utils/formatters';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

console.log('--- TESTING SUDI TENGA MATHEMATICAL FORMULAS ---');

// Test Case 1: Example from Prompt
// P = 10,000, R = 10%, M = 6 months -> I = 6,000, A = 16,000
const monthlyInt = calculateMonthlyInterest(10000, 10);
assert(monthlyInt === 1000, 'Monthly interest for 10,000 @ 10% is 1,000');

const totalInt = calculateTotalInterest(10000, 10, 6);
assert(totalInt === 6000, 'Total interest for 10,000 @ 10% for 6 months is 6,000');

const totalPay = calculateTotalRepayment(10000, totalInt);
assert(totalPay === 16000, 'Total repayment for 10,000 + 6,000 is 16,000');

const result = performCalculation(10000, 10, 6);
assert(result.monthlyInterest === 1000, 'performCalculation monthlyInterest is 1000');
assert(result.totalInterest === 6000, 'performCalculation totalInterest is 6000');
assert(result.totalRepayment === 16000, 'performCalculation totalRepayment is 16000');

// Test Case 2: Zero interest rate (R = 0)
const zeroRateResult = performCalculation(5000, 0, 12);
assert(zeroRateResult.totalInterest === 0, 'Zero rate yields 0 interest');
assert(zeroRateResult.totalRepayment === 5000, 'Zero rate repayment equals principal');

console.log('\n--- TESTING INPUT VALIDATION RULES ---');

// Rule 1: Valid inputs
assert(validateInputs('10000', '10', '6').isValid === true, 'Valid numbers pass');
assert(validateInputs('5000', '0', '1').isValid === true, 'R = 0 is valid (R >= 0)');

// Rule 2: Non-empty check
assert(validateInputs('', '10', '6').isValid === false, 'Empty principal fails');
assert(validateInputs('1000', '', '6').isValid === false, 'Empty rate fails');
assert(validateInputs('1000', '10', '').isValid === false, 'Empty months fails');

// Rule 3: P > 0
assert(validateInputs('0', '10', '6').isValid === false, 'Principal = 0 fails');
assert(validateInputs('-100', '10', '6').isValid === false, 'Negative principal fails');

// Rule 4: R >= 0
assert(validateInputs('1000', '-5', '6').isValid === false, 'Negative rate fails');

// Rule 5: M > 0
assert(validateInputs('1000', '10', '0').isValid === false, 'Months = 0 fails');
assert(validateInputs('1000', '10', '-2').isValid === false, 'Negative months fails');

// Rule 6: NaN strings
assert(validateInputs('abc', '10', '6').isValid === false, 'Non-numeric string fails');

console.log('\n--- TESTING CURRENCY & NUMBER FORMATTING ---');

assert(formatIndianNumber(10000) === '10,000', '10000 formatted to 10,000');
assert(formatIndianNumber(100000) === '1,00,000', '100000 formatted to 1,00,000');
assert(formatIndianNumber(10000000) === '1,00,00,000', '10000000 formatted to 1,00,00,000');
assert(formatCurrency(10000) === '₹10,000', 'formatCurrency(10000) is ₹10,000');
assert(formatCurrency(16000) === '₹16,000', 'formatCurrency(16000) is ₹16,000');
assert(formatCurrency(6000) === '₹6,000', 'formatCurrency(6000) is ₹6,000');

console.log('\n--- TESTING PLURALIZATION ---');

assert(formatMonths(1) === '1 month', '1 -> 1 month');
assert(formatMonths(6) === '6 months', '6 -> 6 months');
assert(formatMonths(12) === '12 months', '12 -> 12 months');
assert(formatMonthsCompact(1) === '1mo', '1 -> 1mo');
assert(formatMonthsCompact(6) === '6mo', '6 -> 6mo');

console.log('\n--- TESTING DATE FORMATTING ---');

const testDate = new Date(2026, 10, 15, 11, 20); // Note: Month 10 is November in 0-indexed JS
const formattedDate = formatDateTime(testDate);
assert(formattedDate === '15 Nov 2026, 11:20 am', `Date formatted as: ${formattedDate}`);

console.log('\n🎉 ALL BUSINESS LOGIC AND FORMATTING TESTS PASSED PERFECTLY!');

