import type {CartItemType} from "../../types/cart.ts";
import {formatCurrency} from "../../utils/helpers.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {clearCart} from "../cart/cartSlice.ts";

interface OrderItemProps {
  item: CartItemType;
  isLoadingIngredients?: boolean;
  ingredients: string[];
}

function OrderItem({ item, ingredients, isLoadingIngredients} : OrderItemProps) {
  const { quantity, name, totalPrice } = item
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <li  className='py-3'>
      <div className='flex justify-between items-center gap-4 text-sm'>
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold" >{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize ilatic text-stone-500'>
        {isLoadingIngredients
          ? 'Loading...'
          : ingredients.join(', ')
        }
      </p>
    </li>
  )
}

export default OrderItem
