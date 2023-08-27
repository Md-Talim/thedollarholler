import type { Invoice, LineItem } from '../../global';

/**
 * Takes all the line items and sums them up
 * @param {Array | undefined} lineItems The array of line items
 * @returns {number} The total sum of all the line Items
 */
export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;

  return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

/**
 * Adds a thousands separator
 * @param {string} myNum An amount
 * @returns A value separated with commas
 */
export const addThousandSeparator = (myNum: string): string => {
  return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Takes a number and returns it with 2 decimal places
 * @param myNum A number without decimal points
 * @returns {string} A number with two decimal points
 */
export const twoDecimals = (myNum: number): string => {
  return myNum.toFixed(2);
};

/**
 * Takes and returns an amount in (USD), formatted with commas and 2 decimal points
 * @param {number} cents An amount in cents
 * @returns {string} Amount in Dollars separated with commas and decimal points
 */
export const centsToDollars = (cents: number): string => {
  const dollars = cents / 100;
  const decimaledDollars = twoDecimals(dollars);
  return addThousandSeparator(decimaledDollars);
};

/**
 * Takes all the invoices and calculates the total
 * @param {Invoice[]} invoices Array of Invoices
 * @returns {number} The sum of total invoices
 */
export const sumInvoices = (invoices: Invoice[]): number => {
  return invoices.reduce((prevValue, curValue) => {
    const sumInvoice = sumLineItems(curValue.lineItems);
    return prevValue + sumInvoice;
  }, 0);
};
