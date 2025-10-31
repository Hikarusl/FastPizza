import type {CartType} from "./cart.ts";

export interface OrderType {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartType,
}

export interface OrderRequestType {
  customer: string;
  phone: string;
  address: string;
  cart: CartType;
}