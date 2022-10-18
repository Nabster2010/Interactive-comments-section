import Avatar from "./Avatar";
import moment from "moment";
import { useDataContext } from "../context/DataContext";

const UserInfo = ({ user, createdAt }) => {
  const { currentUser } = useDataContext();
  const isCurrentUser = currentUser?.username === user?.username;
  return (
    <div className="flex justify-start items-center gap-4">
      <Avatar img={user?.image?.png} />
      <p className="font-medium text-DarkBlue">{user?.username}</p>
      {isCurrentUser && (
        <span className=" bg-ModerateBlue text-White px-1">you</span>
      )}
      <p className="text-GrayishBlue">{moment(createdAt).fromNow()}</p>
    </div>
  );
};

export default UserInfo;
