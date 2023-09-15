import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const newSnackbar = () => {
  const { update, subscribe } = writable<Snackbar[]>([]);

  function send(content: { message: string; type: NotificationType }) {
    const newContent = { id: uuidv4(), ...content };
    update((prevSnackbars) => [...prevSnackbars, newContent]);
  }

  function remove(id: string | null = null) {
    update((prevSnackbars) => {
      if (id) {
        return prevSnackbars.filter((snackbar) => snackbar.id !== id);
      }
      const [, ...rest] = prevSnackbars;
      return [...rest];
    });
  }

  return { subscribe, send, remove };
};

export const snackbar = newSnackbar();
