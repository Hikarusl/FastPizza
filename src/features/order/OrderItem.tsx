import type {CartItemType} from "../../types/cart.ts";
import {formatCurrency} from "../../utils/helpers.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {clearCart} from "../cart/cartSlice.ts";

interface OrderItemProps {
  item: CartItemType;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
}

function OrderItem({ item, } : OrderItemProps) {
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
    </li>
  )
}

export default OrderItem
