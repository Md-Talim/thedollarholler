import { getInvoiceById } from '$lib/stores/InvoiceStore';

export async function load({ params }) {
  const id = params.id;
  const invoice = await getInvoiceById(id);

  return { invoice };
}
