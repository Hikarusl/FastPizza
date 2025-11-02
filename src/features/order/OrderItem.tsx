import type { CartItemType } from '../../types/cart.ts'
import { formatCurrency } from '../../utils/helpers.ts'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearCart } from '../cart/cartSlice.ts'

interface OrderItemProps {
  item: CartItemType
  isLoadingIngredients?: boolean
  ingredients: string[]
}

function OrderItem({ item, ingredients, isLoadingIngredients }: OrderItemProps) {
  const { quantity, name, totalPrice } = item
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="ilatic text-sm text-stone-500 capitalize">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  )
}

export default OrderItem
