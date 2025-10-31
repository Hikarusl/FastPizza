import { getMenu } from '../../services/apiRestaurant'
import { useLoaderData } from 'react-router'
import MenuItem from './MenuItem'
import type {Pizza} from "../../types/pizza.ts";

function Menu() {
  const menu: Pizza[] = useLoaderData()
  return (
    <ul>
      {menu.map(pizza => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

export async function loader() {
  return await getMenu()
}
export default Menu
