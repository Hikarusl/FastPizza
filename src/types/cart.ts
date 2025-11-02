export interface CartItemType {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type CartType = CartItemType[]
