import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { getTotalPrice, getTotalQuantity } from '../../store/selectors.ts'
import { formatCurrency } from '../../utils/helpers.ts'

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice)
  const totalNumber = useSelector(getTotalQuantity)

  if (!totalPrice) return null
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalNumber} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
