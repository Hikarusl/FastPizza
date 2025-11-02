import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {fetchAddress} from "../features/user/userSlice.ts";

export function useUserLocation() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, address, error } = useSelector((state: RootState) => state.user);

  const getLocation = () => dispatch(fetchAddress());

  return { getLocation, status, address, error };
}