export interface Order {
  id?: string;
  prompt: string;
  address: string;
  phone: string;
  status: OrderStatus;
  createdAt: Date;
  userId: string;
}

export type OrderStatus = 'New' | 'In Progress' | 'Completed';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}