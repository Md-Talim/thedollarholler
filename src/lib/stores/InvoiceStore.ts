import { writable } from 'svelte/store';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

/**
 * Loads the invoices into the system.
 *
 * @return {void} - No return value.
 */
export const loadInvoices = (): void => {
  invoices.set(data.invoices);
  // invoices.set([]);
};

/**
 * Deletes an invoice from the list of invoices.
 *
 * @param {Invoice} invoiceToDelete - The invoice to be deleted.
 * @return {Invoice} The deleted invoice.
 */
export const deleteInvoice = (invoiceToDelete: Invoice): Invoice => {
  invoices.update((invoice) => invoice.filter((cur) => cur.id !== invoiceToDelete.id));
  return invoiceToDelete;
};
