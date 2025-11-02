import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './ui/AppLayout'
import Home from './ui/Home'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import MyError from './ui/Error'

const root = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <MyError />,
    children: [
      { path: '/', Component: Home },
      {
        path: '/menu',
        Component: Menu,
        errorElement: <MyError />,
        loader: menuLoader,
      },
      { path: '/cart', Component: Cart },
      {
        path: '/order/new',
        Component: CreateOrder,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        loader: orderLoader,
        Component: Order,
        action: updateOrderAction,
        errorElement: <MyError />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={root} />
}

export default App
