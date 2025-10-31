import type {CartItemType} from "../../types/cart.ts";
import {formatCurrency} from "../../utils/helpers.ts";

interface OrderItemProps {
  item: CartItemType;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
}

function OrderItem({ item, isLoadingIngredients, ingredients } : OrderItemProps) {
  const { quantity, name, totalPrice } = item

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
