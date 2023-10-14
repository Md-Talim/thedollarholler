import { getClientById } from '$lib/stores/ClientStore';

interface Params {
  params: { id: string };
}

export async function load({ params }: Params) {
  const id = params.id;
  const client = await getClientById(id);

  return { client };
}
