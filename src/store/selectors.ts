import type { RootState } from './store'

export const selectUser = (state: RootState) => state.user

export const selectCartItems = (state: RootState) => state.cart.cart

export const getTotalPrice = (state: RootState): number =>
  state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0)

export const getTotalQuantity = (state: RootState): number =>
  state.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0)

export const getCurrentQuantityById =
  (id: number) =>
  (state: RootState): number => {
    return state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0
  }
