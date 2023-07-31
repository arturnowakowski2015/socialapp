import { Posts, User, Login } from "../../../model/Interface";
import { BottomCard } from "./bottom/BottomCard";
import { CenterCard } from "./center/CenterCard";
import { TopCard } from "./top/TopCard";
import "./PostCard.css";
interface IProps {
  item: Posts;

  users?: User[];
  login: Login;
  onlineUser: User;
  token: string;
  doLikes: (postid: number, token: string, userid?: number) => void;

  addFriend: (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => void;
  createComment: (
    onlineUser: User,
    post: Posts,
    token: string,
    str: string
  ) => void;
}
export const PostCard = ({
  item,

  users,
  login,
  onlineUser,
  token,
  doLikes,

  addFriend,
  createComment,
}: IProps) => {
  return (
    <div className="cardContainer">
      <TopCard
        users={users}
        onlineUser={onlineUser}
        post={item}
        addFriend={addFriend}
        token={token}
      />
      <hr></hr>
      <CenterCard post={item} />
      <hr></hr>

      <BottomCard
        onlineUser={onlineUser}
        post={item}
        users={users}
        token={token}
        login={login}
        doLikes={doLikes}
        createComment={createComment}
      />
    </div>
  );
};
