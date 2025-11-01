import {useDispatch} from "react-redux";
import {fetchAddress} from "./userSlice.ts";
import type {AppDispatch} from "../../store/store.ts";
import Button from "../../ui/Button.tsx";

const  UserLocationButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button type='small' onClick={(e) => {
      e.preventDefault();
      dispatch(fetchAddress())
    }}>
      Get Position
    </Button>
  )
}

export default UserLocationButton