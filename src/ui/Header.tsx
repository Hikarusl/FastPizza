import { Link } from 'react-router'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/UserName'

const Header = () => {
  return (
    <header className="flex item-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-wider">
        Fast Pizza
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  )
}

export default Header
