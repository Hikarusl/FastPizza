import Button from "../../ui/Button.tsx";
import {useDispatch} from "react-redux";
import {deleteItem} from "./cartSlice.ts";

interface DeleteCartItemProps {
  id: number;
}
function DeleteCartItem({id}: DeleteCartItemProps) {
  const dispatch = useDispatch();


  return (
    <Button
      type='small'
      onClick={() => {dispatch(deleteItem(id))}}

    >
      Delete
    </Button>
  )
}

export default DeleteCartItem