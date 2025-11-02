import type { CartItemType } from '../../types/cart.ts'
import { formatCurrency } from '../../utils/helpers.ts'
import DeleteCartItem from './DeleteCartItem.tsx'
import UpdateCartItemQuantity from './UpdateCartItemQuantity.tsx'
import { useSelector } from 'react-redux'
import { getCurrentQuantityById } from '../../store/selectors.ts'

interface CartItemProps {
  item: CartItemType
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartItemQuantity id={pizzaId} quantity={currentQuantity} />
        <DeleteCartItem id={pizzaId} />
      </div>
    </li>
  )
}

export default CartItem
