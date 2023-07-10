import { useNavigate } from "react-router-dom";
import { User } from "../data/Interface";
import useProfileLabel from "../hooks/useProfileLabel";
interface IProps {
  user?: User;
  changeProfile: (user: User, token: string, url: string) => void;
  login: User;
}
const ProfileLabel = ({ user, login, changeProfile }: IProps) => {
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
                      login.password,
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
export default ProfileLabel;
