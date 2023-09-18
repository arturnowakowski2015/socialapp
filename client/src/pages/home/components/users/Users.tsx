import { User } from "../../../../model/Interface";
interface IProps {
  token: string;
  item: User;
  onlineUser: User;
  changeProfile: (user: User, token: string, url: string) => void;
  getPostOfUser: (token: string, url: string) => void;
}

export const Users = ({
  token,
  item,
  onlineUser,
  changeProfile,
  getPostOfUser,
}: IProps) => {
  return (
    <>
      {item._id !== onlineUser._id && (
        <div className="container">
          <div className={item.online ? "loggedin" : "loggedout"}></div>
          <div
            onClick={(e) => {
              e.preventDefault();
              changeProfile(
                item,
                token,
                "http://localhost:3001/users/" + item._id
              );
              getPostOfUser(
                token,
                "http://localhost:3001/" + item._id + "/posts"
              );
            }}
          >
            {item.email}
          </div>
        </div>
      )}
    </>
  );
};
