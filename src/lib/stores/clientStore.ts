import { writable } from 'svelte/store';
import type { Client } from '../../global';
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
