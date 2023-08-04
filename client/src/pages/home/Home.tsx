import { usePost } from "./api/usePost";
import { useUser } from "./api/useUser";
import { useEffect, useState, useReducer } from "react";
import { User, Login, Notifications, Posts } from "../../model/Interface";
import { PostCard } from "../../features/layout/card/PostCard";
import { ProfileLabel } from "../../features/ui/profile/ProfileLabel";
import { Owner } from "../../features/ui/online/Owner";
import CreatePostCard from "../../features/layout/card/CreatePostCard";
import io from "socket.io-client";
import useNotifications from "./api/useNotifications";
import GenericList from "../../features/genericgroup/GenericList";
import { reducer, Action } from "./api/useNotificationReducer";

import "./Home.css";
interface Data {
  text: string;
  uid: number;
  flag: number;
  flag1: number;
}
interface IProps {
  startedloggedin: string[];
  user: User;
  login: Login;
  onlineUser: User;
  token: string;
}
export const Home = ({
  startedloggedin,
  user,
  login,
  onlineUser,
  token,
}: IProps) => {
  const {
    posts,
    profile,
    setProfile,
    getPosts,
    changeProfile,
    getPostOfUser,
    doLikes,
    setInput,
    sendPost,
    createComment,
  } = usePost();
  const { loggedin, users, loaderUser, getUsers, addFriend, loginmessage } =
    useUser(token);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);
  const [notifications, setNotifications, socket, setSocket] =
    useNotifications();
  const refresh = () => {
    dispatch({ type: "resetPost" });
    setRefreshPosts(true);
  };
  useEffect(() => {
    getPosts({
      type: "get",
      data: [],
      token: login.token,
      url: "http://localhost:3000/p",
    });
    getUsers();

    setProfile(user);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getPosts({
      type: "get",
      data: [],
      token: login.token,
      url: "http://localhost:3000/p",
    });
    getUsers();
    setRefreshPosts(false);
  }, [refreshPosts]); // eslint-disable-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    likes: [],
    comments: [],
    posts: [],
  });
  useEffect(() => {
    const socketIo = io("localhost:3002");

    socketIo.on("message_from_users", (data) =>
      dispatch({ type: "user", data: data })
    );

    socketIo.on("message_from_comments", (data) =>
      dispatch({ type: "comments", onlineUser: onlineUser, data: data })
    );

    socketIo.on("message_from_likes", (data) =>
      dispatch({ type: "likes", data: data })
    );

    socketIo.on("message_from_posts", (data) =>
      dispatch({ type: "posts", onlineUser: onlineUser, data: data })
    );
    socketIo.on("message_from_register", () => getUsers());
    socketIo.on("message_from_login", (online) => loginmessage(online));

    socketIo.on("disconnect", function () {
      console.log("disconnect");
    });

    socketIo.emit("message_about_userid", {
      uid: onlineUser && onlineUser._id,
    });

    return () => {
      socketIo.removeListener("message_from_posts");
      socketIo.removeListener("message_from_likes");
      socketIo.removeListener("message_from_comments");
      socketIo.removeListener("message_from_users");
    };
  }, [login, doLikes, sendPost, addFriend]);
  useEffect(() => {
    setProfile(user);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUsers();
  }, [onlineUser]);
  return (
    <>
      <div>
        DDDDDDDDDDDDDDDDDDDDDDDd
        <Owner
          notifications={state}
          login={onlineUser as User}
          refresh={refresh}
        />
        DDDDDDDDDDDDDDDDDDDDddd
      </div>
      <div className="container">
        <div className="leftbar">
          <ProfileLabel
            user={profile}
            changeProfile={changeProfile}
            login={login}
          />
        </div>
        <div className="centerbar">
          <div>
            <CreatePostCard
              token={token}
              setInput={setInput}
              sendPost={sendPost}
              onlineUser={onlineUser}
              socket={socket}
            />{" "}
            <GenericList
              items={posts}
              childComp={
                <PostCard
                  item={{} as Posts}
                  users={users}
                  login={login}
                  doLikes={doLikes}
                  onlineUser={onlineUser}
                  token={token}
                  addFriend={addFriend}
                  createComment={createComment}
                />
              }
            />
          </div>
        </div>
        {JSON.stringify(loggedin)}
        <div className="rightbar">
          {users?.map((t: any) => {
            return (
              t._id !== onlineUser._id && (
                <div className="container">
                  <div className={t.online ? "loggedin" : "loggedout"}></div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      changeProfile(
                        t,
                        login.token,
                        "http://localhost:3000/users/" + t._id
                      );
                      getPostOfUser(
                        login.token,
                        "http://localhost:3000/" + t._id + "/posts"
                      );
                    }}
                  >
                    {t.email}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
