import { Link } from 'react-router';
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  return (
    <header>
      <Link to='/'>Fast Pizza</Link>
      <SearchOrder/>
      <p>ggg</p>
    </header>
  )
}

export default Header;