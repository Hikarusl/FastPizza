import { formatCurrency } from '../../utils/helpers'
import type {Pizza} from "../../types/pizza.ts";
import Button from "../../ui/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../cart/cartSlice.ts";
import type {CartItemType} from "../../types/cart.ts";
import DeleteCartItem from "../cart/DeleteCartItem.tsx";
import {getCurrentQuantityById} from "../../store/selectors.ts";
import UpdateCartItemQuantity from "../cart/UpdateCartItemQuantity.tsx";

interface MenuItemProps {
  pizza: Pizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const {id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0;

  function handleAddToCart(): void {
    const newPizza: CartItemType = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    }
    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5 ">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut
            ? <p className="text-sm" >{formatCurrency(unitPrice)}</p>
            : <p className="text-sm uppercase text-stone-500" >Sold out</p>
          }

          {isInCart
            && <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateCartItemQuantity id={id} quantity={currentQuantity}/>
              <DeleteCartItem id={id}/>
            </div>
          }
          {!soldOut && !isInCart && <Button type='small' onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
