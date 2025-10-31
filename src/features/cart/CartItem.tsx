import type {CartItemType} from "../../types/cart.ts";
import {formatCurrency} from "../../utils/helpers.ts";
import Button from "../../ui/Button";

interface CartItemProps {
  item: CartItemType;
}


function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice } = item

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center  sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type='small'>Delete</Button>
      </div>
    </li>
  )
}

export default CartItem
