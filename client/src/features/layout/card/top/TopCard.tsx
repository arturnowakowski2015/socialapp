import { User, Posts } from "../../../../model/Interface";
import { useEffect } from "react";

interface IProps {
  users?: User[];
  onlineUser: User;
  post: Posts;
  token: string;
  addFriend: (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => void;
}
export const TopCard = ({
  users,
  onlineUser,
  post,
  token,
  addFriend,
}: IProps) => {
  return (
    <div className="top">
      <img
        className="avatar"
        style={{ width: "40px", height: "40px" }}
        src={"http://localhost:3000/assets/" + post.userPicturePath}
      />
      <div className="email">
        { 
          users?.[
            users.findIndex((t) => {
              return Number(t._id) == Number(post.userId);
            })
          ]?.firstName}
      </div>{" "}
      {Number(onlineUser._id) !== post.userId && (
        <legend className="addFriend">
          {
          onlineUser?.friends?.filter((t) => {
            return t.toString() === post.userId.toString() && t;
          }).length === 0 ? (
            <div
              onClick={(e) => {
                e.preventDefault();alert("ddd  "+token)
                addFriend(onlineUser, token, post.userId, users?.[0]);
              }}
            >
              {" "}
              <i className="f fa-sharp fa-solid fa-user"></i>
            </div>
          ) : (
            <div
              onClick={() => {
                addFriend(onlineUser, token, post.userId,  users?.[0]);
              }}
            >
              <i className="b fa-sharp fa-regular fa-user"></i>
            </div>
          )}
        </legend>
      )}{" "}
    </div>
  );
};
