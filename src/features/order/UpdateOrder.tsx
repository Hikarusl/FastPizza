import Button from "../../ui/Button.tsx";
import type {FC} from "react";
import {useFetcher} from "react-router";
import type {ActionFunctionArgs} from "react-router";
import {updateOrder} from "../../services/apiRestaurant.ts";


const UpdateOrder: FC  = ()=> {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button>
        Make priority
      </Button>
    </fetcher.Form>
  )
}

export default UpdateOrder;

export async function action({params}: ActionFunctionArgs): Promise<void> {
  const data = {priority: true}
  const orderId = params.orderId;

  if (!orderId) {
    throw new Error("Missing orderId parameter");
  }

  await updateOrder(orderId, data)
}