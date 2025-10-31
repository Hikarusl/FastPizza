import type {OrderType} from "../types/order.ts";
import type {Pizza} from "../types/pizza.ts";

const API_URL = 'https://react-fast-pizza-api.jonas.io/api'

export async function getMenu():Promise<Pizza[]> {
  const res = await fetch(`${API_URL}/menu`)

  if (!res.ok) throw Error('Failed getting menu')

  const { data } = await res.json()
  return data
}

export async function getOrder(id: string):Promise<OrderType> {
  const res = await fetch(`${API_URL}/order/${id}`)
  if (!res.ok) throw Error(`Couldn't find order #${id}`)

  const { data } = await res.json()
  return data
}

export async function createOrder(newOrder:OrderType):Promise<OrderType> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const errorBody = await res.text()
      throw new Error(`Request failed: ${res.status} ${res.statusText}\n${errorBody}`)
    }
    const { data } = await res.json()
    return data
  } catch {
    throw Error('Failed creating your order')
  }
}
//
// export async function updateOrder(id, updateObj) {
//   try {
//     const res = await fetch(`${API_URL}/order/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify(updateObj),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (!res.ok) throw Error();
//     // We don't need the data, so we don't return anything
//   } catch (err) {
//     throw Error('Failed updating your order');
//   }
// }
