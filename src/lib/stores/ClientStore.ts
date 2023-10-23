import supabase from '$lib/utils/supabase';
import { writable } from 'svelte/store';
import { snackbar } from './SnackbarStore';

export const clients = writable<Client[]>([]);

/**
 * Loads the clients into the 'clients' data structure.
 *
 * @param {void} - No parameters are required.
 * @return {Promise<void>} - A Promise that resolves when the clients are loaded.
 */
export const loadClients = async (): Promise<void> => {
  const { data, error } = await supabase
    .from('client')
    .select('*, invoice(id, invoiceStatus, lineItems(*))');

  if (error) {
    console.error(error);
    return;
  }

  clients.set(data as Client[]);
};

/**
 * Adds a client to the list of clients.
 *
 * @param {Client} clientToAdd - The client to be added.
 * @return {Client} The added client.
 */
export const addClient = async (clientToAdd: Client): Promise<Client | void> => {
  const { data, error } = await supabase
    .from('client')
    .insert([{ ...clientToAdd, clientStatus: 'active' }])
    .select();

  if (error) {
    console.error(error);
    snackbar.send({ message: 'Failed to add client', type: 'error' });
    return;
  }

  const id = data[0].id;

  clients.update((clients) => [...clients, { ...clientToAdd, clientStatus: 'active', id }]);
  return clientToAdd;
};

/**
 * Updates a client in the system.
 *
 * @param {Client} clientToUpdate - The client object to be updated.
 * @return {Client} The updated client object.
 */
export const updateClient = (clientToUpdate: Client): Client => {
  clients.update((clients) =>
    clients.map((currrentClient) =>
      currrentClient.id === clientToUpdate.id ? clientToUpdate : currrentClient
    )
  );
  return clientToUpdate;
};

export const getClientById = async (id: string) => {
  const { data, error } = await supabase
    .from('client')
    .select('*, invoice(id, invoiceStatus, invoiceNumber, dueDate, client(id, name), lineItems(*))')
    .eq('id', id);

  if (error) {
    console.error(error);
    return;
  }

  if (data && data[0]) return data[0] as Client;

  console.warn('Cannot find client with id:', id);
};
