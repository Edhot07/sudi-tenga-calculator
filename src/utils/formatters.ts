/**
 * Format a number into the Indian Numbering Format (en-IN).
 * E.g., 10000 -> "10,000", 100000 -> "1,00,000", 10000000 -> "1,00,00,000"
 * Omits trailing unnecessary zeros (.00).
 */
export function formatIndianNumber(num: number): string {
  if (isNaN(num)) return '0';

  // Round to max 2 decimal places to prevent float precision artifacts
  const rounded = Math.round(num * 100) / 100;
  const isNegative = rounded < 0;
  const absNum = Math.abs(rounded);

  const parts = absNum.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  let formattedInteger = integerPart;
  if (integerPart.length > 3) {
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formattedInteger = `${formattedOthers},${lastThree}`;
  }

  const sign = isNegative ? '-' : '';
  if (decimalPart && parseInt(decimalPart, 10) > 0) {
    // Trim trailing zero if e.g. 50 -> 5
    const trimmedDecimals = decimalPart.replace(/0+$/, '');
    return `${sign}${formattedInteger}.${trimmedDecimals}`;
  }

  return `${sign}${formattedInteger}`;
}

/**
 * Format a numeric amount to Indian Rupee currency representation:
 * E.g., formatCurrency(10000) -> "₹10,000"
 * formatCurrency(16000.5) -> "₹16,000.5"
 */
export function formatCurrency(amount: number): string {
  return `₹${formatIndianNumber(amount)}`;
}

/**
 * Format months count with correct pluralization:
 * 1 -> "1 month"
 * 6 -> "6 months"
 */
export function formatMonths(months: number): string {
  if (months === 1) {
    return '1 month';
  }
  return `${months} months`;
}

/**
 * Format months into compact badge representation:
 * 1 -> "1mo"
 * 6 -> "6mo"
 */
export function formatMonthsCompact(months: number): string {
  return `${months}mo`;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format Date to standard Indian English human readable format:
 * E.g., "15 Nov 2026, 11:20 am"
 */
export function formatDateTime(dateInput: Date | string | number = new Date()): string {
  const d = typeof dateInput === 'object' && dateInput instanceof Date
    ? dateInput
    : new Date(dateInput);

  if (isNaN(d.getTime())) {
    return '';
  }

  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour is 12 am
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${day} ${month} ${year}, ${hours}:${formattedMinutes} ${ampm}`;
}

