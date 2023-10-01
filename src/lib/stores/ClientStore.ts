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
  clients.update((clients) => [...clients, { ...clientToAdd, clientStatus: 'active' }]);
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

export const getClientById = (id: string) => {
  return data.clients.find((client) => client.id === id);
};
