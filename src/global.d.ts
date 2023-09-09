import type { ClientStatus, invoiceStatus } from './enums';

declare global {
  interface Invoice {
    client: Client;
    createdAt: string;
    dueDate: string;
    id: string;
    invoiceNumber: string;
    invoiceStatus: invoiceStatus;
    issueDate: string;
    lineItems: LineItem[];
    notes?: string;
    subject?: string;
    terms?: string;
  }

  interface LineItem {
    amount: number;
    description: string;
    id: string;
    quantity: number;
  }

  interface Client {
    city: string;
    clientStatus: ClientStatus;
    email: string;
    id: string;
    name: string;
    state: string;
    street: string;
    street: string;
    zip: string;
  }
}

export {};
