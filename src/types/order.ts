import type { CartType } from './cart.ts'

// То что вводит пользователь в форму
export interface FormOrderType {
  customer: string
  phone: string
  address: string
  cart: CartType
}
// добавляет модификации перед отправкой на сервер
export interface NewFormOrderType extends FormOrderType {
  priority: boolean
}
// Добавленные сервером поля
export interface OrderServerFields {
  id: string
  status: 'pending' | 'confirmed' | 'delivered'
  priorityPrice: number
  orderPrice: number
  estimatedDelivery: string
}

export type OrderType = NewFormOrderType & OrderServerFields
