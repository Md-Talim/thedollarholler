import supabase from '$lib/utils/supabase';
import { writable } from 'svelte/store';

export const invoices = writable<Invoice[]>([]);

/**
 * Loads the invoices into the system.
 *
 * @returns {Promise<void>} A Promise that resolves when the invoices are loaded.
 */
export const loadInvoices = async (): Promise<void> => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)');

  if (error) {
    console.error(error);
    return;
  }

  invoices.set(data as Invoice[]);
};

/**
 * Adds an invoice to the list of invoices.
 *
 * @param {Invoice} invoiceToAdd - The invoice to be added.
 * @return {Invoice} - The added invoice.
 */
export const addInvoice = (invoiceToAdd: Invoice): Invoice => {
  invoices.update((invoice) => [...invoice, invoiceToAdd]);
  return invoiceToAdd;
};

/**
 * Updates an invoice in the system.
 *
 * @param {Invoice} invoiceToUpdate - The invoice object to update.
 * @return {Invoice} The updated invoice.
 */
export const updateInvoice = (invoiceToUpdate: Invoice): Invoice => {
  invoices.update((prev: Invoice[]) =>
    prev.map((cur: Invoice) => (cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
  );
  return invoiceToUpdate;
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

export const getInvoiceById = async (id: string) => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(*), lineItems(*)')
    .eq('id', id);

  if (error) {
    console.error(error);
    return;
  }

  if (data && data[0]) return data[0] as Invoice;

  console.warn('Cannot find invoice with id:', id);
};
