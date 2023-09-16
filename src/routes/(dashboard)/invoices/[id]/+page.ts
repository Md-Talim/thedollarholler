import { getInvoiceById } from '$lib/stores/InvoiceStore';

export function load({ params }) {
  const id = params.id;
  const invoice = getInvoiceById(id);

  return invoice;
}
