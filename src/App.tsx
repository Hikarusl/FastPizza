import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu, {loader as menuLoader} from "./features/menu/Menu"
import Cart from "./features/cart/Cart";
import CreateOrder, { action as createOrderAction } from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import Error from "./ui/Error"

const root = createBrowserRouter(
  [
    {
      Component: AppLayout,
      errorElement: Error,
      children: [
        { path: "/",Component: Home,},
        {
          path: '/menu',
          Component: Menu,
          errorElement: Error,
          loader: menuLoader,
        },
        {path: '/cart', Component: Cart },
        {
          path: '/order/new',
          Component: CreateOrder,
          action: createOrderAction,
        },
        {
          path: '/order/:orderId',
          loader: orderLoader,
          Component: Order,
          errorElement: Error,
        }
      ],
    },
  ],
)

const App = () => {

  return (
    <RouterProvider router={root}/>
  )
}


export default App