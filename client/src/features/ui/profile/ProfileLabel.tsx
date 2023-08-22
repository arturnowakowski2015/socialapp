import { useNavigate } from "react-router-dom";
import { Login, User } from "../../../model/Interface";
import useProfileLabel from "./api/useProfileLabel";
interface IProps {
  user?: User;
  token:string,
  changeProfile: (user: User, token: string, url: string) => void;
 }
export const ProfileLabel = ({ user, token , changeProfile }: IProps) => {
  const [friends, setFriends] = useProfileLabel();
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate("profile/" + (user && user._id))}>
        ?{user && user.email}?
      </div>
      <div onClick={() => setFriends(!friends)}>
        ....
        {JSON.stringify(user)}.....
        <div>
          {friends &&
            user &&
            user.friends &&
            user.friends.map((t: any) => {
              return (
                <div
                  onClick={(e) => {
                    changeProfile(
                      user,
                      token,
                      "http://localhost:3000/users/" + user._id
                    );
                  }}
                >
                  {t}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
