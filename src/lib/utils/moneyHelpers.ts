import type { Invoice, LineItem } from '../../global';

export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;

  return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};

export const addThousandSeparator = (myNum: string): string => {
  return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const twoDecimals = (myNum: number): string => {
  return myNum.toFixed(2);
};

export const centsToDollars = (cents: number): string => {
  const dollars = cents / 100;
  const decimaledDollars = twoDecimals(dollars);
  return addThousandSeparator(decimaledDollars);
};

export const sumInvoices = (invoices: Invoice[]): number => {
  return invoices.reduce((prevValue, curValue) => {
    const sumInvoice = sumLineItems(curValue.lineItems);
    return prevValue + sumInvoice;
  }, 0);
};
