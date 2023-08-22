import { useNavigate } from "react-router-dom";
import { Login, User } from "../../../model/Interface";
import { GenericList } from "../../../shared/generic";
import {Friends} from "./components/Friends"
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

        <GenericList items={user?.friends} childComp={<Friends item={{} as User} token={token} changeProfile={changeProfile} />} />
  
        </div>
      </div>
    </>
  );
};
