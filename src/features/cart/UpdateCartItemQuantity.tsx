import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice.ts'

interface UpdateCartItemProps {
  id: number
  quantity: number
}

function UpdateCartItemQuantity({ id, quantity }: UpdateCartItemProps) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  )
}

export default UpdateCartItemQuantity
