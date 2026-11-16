# Sudi Tenga Calculator (Chakma Money Lending Calculator)

A production-ready mobile application designed for calculating traditional informal money lending interest in the Chakma financial system.

---

## 1. App Concept & Domain Context

**"Sudi Tenga"** is a traditional informal money-lending calculation system:
* **"Sudi" (সুদি)**: Interest
* **"Tenga" (তেঙা)**: Money / Principal
* **"Hoi tenga dor" (হই তেঙা দর)**: Interest rate per month (e.g., 10 tenga interest per 100 tenga principal each month)

Unlike annual compound bank loans, this system calculates **monthly simple interest** based on a flat monthly percentage rate over a set number of months.

---

## 2. Mathematical Formulas

* $P$ = Principal amount borrowed / lent (₹)
* $R$ = Monthly interest rate percentage (%)
* $M$ = Loan duration in months

1. **Monthly Interest**:
   $$\text{Interest per Month} = P \times \left(\frac{R}{100}\right)$$
2. **Total Accrued Interest**:
   $$\text{Total Interest } (I) = \left(\frac{R}{100}\right) \times P \times M$$
3. **Total Repayment Amount**:
   $$\text{Total to Pay } (A) = P + I$$

### Example:
* Principal ($P$) = ₹10,000
* Monthly Rate ($R$) = 10%
* Duration ($M$) = 6 months
* Total Interest ($I$) = ₹6,000
* Total Repayment ($A$) = ₹16,000

---

## 3. Features & Architecture

* **Dark-Mode-First Fintech UI**: High-contrast, elegant obsidian & electric blue aesthetic.
* **Animated Result Card**:
  - Smooth slide (`translateY: -20 -> 0`) and fade (`opacity: 0 -> 1`) animation.
  - Green status indicator: *"Calculation Complete"*.
  - Large highlighted total repayment amount.
  - Two-column breakdown container: Principal & Total Interest.
  - Metadata row with month pluralization and rate breakdown.
  - *"New Calculation"* reset button.
* **Loan Details Input Card**:
  - Custom styled input fields with prefix (`₹`), suffix (`%`), and calendar icon.
  - Active focus border styling.
  - Quick preset chips for common rates (5%, 10%, 15%, 20%) and durations (1, 3, 6, 12 months).
  - High-elevation "Calculate Total" primary button.
* **Local Persistence & History**:
  - Powered by `@react-native-async-storage/async-storage` under key `"sudiTengaHistory"`.
  - FIFO eviction preserving the 50 most recent calculations.
  - Tap any history entry to reload into the calculator.
  - Delete individual entries or clear all with confirmation dialog.
* **Resilience & Accessibility**:
  - Comprehensive input validation ($P > 0, R \ge 0, M > 0$).
  - Full Indian Numbering Format (`en-IN`) without unnecessary decimals: `₹10,000`.
  - Wrapped in root `ErrorBoundary` to catch any runtime exceptions gracefully.
  - Interactive "About Sudi Tenga" modal with glossary and formula references.

---

## 4. Getting Started

### Prerequisites
* Node.js (v18+)
* npm or yarn

### Installation
```bash
npm install
```

### Running the App
* **Start Dev Server**: `npx expo start` or `npm start`
* **Android**: `npm run android`
* **iOS**: `npm run ios`
* **Web**: `npm run web`

### Running the Logic Test Suite
```bash
npx tsx scripts/test-logic.ts
```
