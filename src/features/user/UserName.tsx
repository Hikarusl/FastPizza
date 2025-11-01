import {useSelector} from "react-redux";
import {selectUser} from "../../store/selectors.ts";

const UserName = () => {
  const {username} = useSelector(selectUser);

  if (!username) return null;
  return (
    <div className="text-sm font-semibold hidden md:block">
      {username}
    </div>)
}

export default UserName
