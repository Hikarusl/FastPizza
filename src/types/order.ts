import type {Cart} from "./cart.ts";

export interface OrderType {
  id: string;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: Cart,
}

