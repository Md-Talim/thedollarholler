import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

/**
 * Loads the clients into the 'clients' data structure.
 *
 * @param {void} - No parameters are required.
 * @return {void} - No return value.
 */
export const loadClients = (): void => {
  clients.set(data.clients);
};

/**
 * Adds a client to the list of clients.
 *
 * @param {Client} clientToAdd - The client to be added.
 * @return {Client} The added client.
 */
export const addClient = (clientToAdd: Client): Client => {
  clients.update((clients) => [...clients, clientToAdd]);
  return clientToAdd;
};
