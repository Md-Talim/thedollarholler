import { getClientById } from '$lib/stores/ClientStore';

interface Params {
  params: { id: string };
}
export function load({ params }: Params) {
  const id = params.id;
  const client = getClientById(id);

  return { client };
}
