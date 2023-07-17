import { Posts, User, Login } from "../data/Interface";
import BottomCard from "./BottomCard";
import CenterCard from "./CenterCard";
import TopCard from "./TopCard";
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
const PostCard = ({
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

export default PostCard;
