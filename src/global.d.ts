import type { ClientStatus, InvoiceStatus } from './enums';

declare global {
  interface Invoice {
    client: Client;
    createdAt: string;
    discount?: number;
    dueDate: string;
    id: string;
    invoiceNumber: string;
    invoiceStatus: InvoiceStatus;
    issueDate: string;
    lineItems?: LineItem[];
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
    city?: string;
    clientStatus?: ClientStatus;
    email: string;
    id: string;
    name: string;
    state?: string;
    street?: string;
    zip?: string;
  }

  type NotificationType = 'success' | 'error' | 'warning' | 'info';

  interface Snackbar {
    id: string;
    message: string;
    type: NotificationType;
  }
}

export {};
