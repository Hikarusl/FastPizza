// Test ID: IIDSAT
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers'
import { getOrder } from '../../services/apiRestaurant'
import {useLoaderData} from 'react-router'
import type {LoaderFunctionArgs} from 'react-router'
import type {OrderType} from '../../types/order.ts'
import OrderItem from "./OrderItem.tsx";

function Order() {
  const order: OrderType = useLoaderData()
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart
  } = order
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold" >Order № {id} status</h2>

        <div className="space-x-2" >
          {priority
            && <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
          </span>
          }
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='dive-stone-200 divide-y border-b border-t'>
        {cart.map((item) =>
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={false}
            // ingredients={}
          />
          )
        }
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority
          && <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
        </p>
        }
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  )
}

export async function loader({ params } :LoaderFunctionArgs):Promise<OrderType> {
  const { orderId } = params;
  if (!orderId) {
    throw new Response("Order ID is missing", { status: 400 });
  }
  return await getOrder(orderId)
}

export default Order
