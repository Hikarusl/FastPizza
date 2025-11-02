import type {NewFormOrderType, OrderType} from "../types/order.ts";
import type {Pizza} from "../types/pizza.ts";
import {apiFetch} from "./apiClient.ts";

const API_URL = 'https://react-fast-pizza-api.jonas.io/api'

export async function getMenu():Promise<Pizza[]> {
  return apiFetch<{ data: Pizza[] }>(
    `${API_URL}/menu`)
    .then(r => r.data);
}

export async function getOrder(id: string):Promise<OrderType> {
  return apiFetch<{ data: OrderType }>(
    `${API_URL}/order/${id}`)
    .then(r => r.data);
}

export async function createOrder(newOrder: NewFormOrderType): Promise<OrderType> {
  return apiFetch<{ data: OrderType }>(
    `${API_URL}/order`,
    { method: 'POST',
      body: JSON.stringify(newOrder),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.data);
}
export async function updateOrder(id: string, updateObj: Partial<OrderType>) : Promise<void> {
  await apiFetch<{ data: OrderType }>(
    `${API_URL}/order/${id}`,
    { method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: { 'Content-Type': 'application/json' }
    })
}

