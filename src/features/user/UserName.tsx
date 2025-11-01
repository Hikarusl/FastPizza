import {useSelector} from "react-redux";
import type {RootState} from "../../store.ts";

const UserName = () => {
  const username: string = useSelector((state: RootState) => state.user.username)

  if (!username) return null;
  return (
    <div className="text-sm font-semibold hidden md:block">
      {username}
    </div>)
}

export default UserName
