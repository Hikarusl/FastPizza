import { useState } from 'react'
import {
  Form,
  redirect,
  useActionData,
  useNavigation
} from 'react-router'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import type {NewFormOrderType, OrderType} from "../../types/order.ts";
import {useSelector} from "react-redux";
import {
  getTotalPrice,
  selectCartItems,
  selectUser
} from "../../store/selectors.ts";
import EmptyCart from "../cart/EmptyCart.tsx";
import {formatCurrency} from "../../utils/helpers.ts";
import UserLocationButton from "../user/UserLocationButton.tsx";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (phone: string): boolean => {
  return  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)
}

function CreateOrder() {
  const navigation = useNavigation()
  const isSubmitting: boolean = navigation.state === 'submitting'
  const formErrors = useActionData()

  const {username, status: statusAddress, address, position} = useSelector(selectUser);
  const isLoadingAddress = statusAddress === 'loading';

  const [withPriority, setWithPriority] = useState<boolean>(false)
  const cart = useSelector(selectCartItems)

  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice: number  = 0.2
  const finalPrice = totalCartPrice * (1 + priorityPrice * Number(withPriority))


  if (cart.length === 0) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        {/*name*/}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>
        {/*phone*/}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" aria-describedby="phone-error" required />
            {formErrors?.phone && (
              <p
                role="alert"
                id="phone-error"
                className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700"
              >
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        {/*address*/}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              defaultValue={address}
              type="text"
              name="address"
              required
              className="input w-full"
            />
            {statusAddress ==='error' && (
              <p
                role="alert"
                className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700"
              >
                User denied geolocation
              </p>
            )}
          </div>
          {(!position?.latitude) && <UserLocationButton/>}

        </div>
        {/*priority*/}
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        {/*submit*/}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            disabled={isSubmitting}
            type="primary"
          >
            {isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  const order: NewFormOrderType = {
    customer: String(data.customer),
    phone: String(data.phone),
    address: String(data.address),
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  }

  //Валидация номера телефона
  const errors: Record<string, string> = {}
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter valid phone number'
  }
  if (Object.keys(errors).length > 0) {
    return errors
  }

  const newOrder: OrderType = await createOrder(order)
  return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder
