import Header from './Header'
import Loader from './Loader'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router'

const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />

      <main>
        <h1>Hi</h1>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  )
}

export default AppLayout
