import { Posts, User, DataCreateComment } from "../../../model/Interface";
import { BottomCard } from "./bottom/BottomCard";
import { CenterCard } from "./center/CenterCard";
import { TopCard } from "./top/TopCard";
import "./PostCard.css";
interface IProps {
  item: Posts;
  user: string;
  users?: User[];
  onlineUser: User;
  token: string;
  doLikes: (postid: number, token: string, userid?: number) => void;

  addFriend: (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => void;
  createComment: (item: DataCreateComment) => void;
}
export const PostCard = ({
  item,
  user,
  users,
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
        user={user}
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
        doLikes={doLikes}
        createComment={createComment}
      />
    </div>
  );
};
