import {createSlice} from "@reduxjs/toolkit";
import type {CartType} from "../../types/cart.ts";

const initialState: {cart: CartType} = {
  cart: [
    {
      pizzaId: 12,
      name: 'Mediterranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    }
  ],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload id
      state.cart =  state.cart.filter(pizza => pizza.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload {id}
      const item = state.cart.find(pizza => pizza.pizzaId === action.payload);
      if (item !== undefined){
        item.quantity++ ;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity: (state, action) => {
      // payload {id}
      const item = state.cart.find(pizza => pizza.pizzaId === action.payload);
      if (item !== undefined){
        item.quantity--;
        if (item.quantity === 0) {
          state.cart =  state.cart.filter(pizza => pizza.pizzaId !== action.payload);
        }
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart: (state, ) :void => {
      state.cart = [];
    }
  }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;