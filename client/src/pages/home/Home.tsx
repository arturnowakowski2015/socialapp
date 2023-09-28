import { WhoisOnline } from "./components/whoisonline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./components/settings/Container";
import { usePost } from "./api/usePost";
import { useUser } from "./api/useUser";
import { useEffect, useState, useReducer } from "react";
import { User, Login, Notifications, Posts } from "../../model/Interface";
import { PostCard } from "../../features/layout/card/PostCard";
import { ProfileLabel } from "../../features/ui/profile/ProfileLabel";
import { Menu } from "../../features/ui/online/Menu";
import CreatePostCard from "../../features/layout/card/CreatePostCard";
import io from "socket.io-client";
import useNotifications from "./api/useNotifications";
import GenericList from "../../shared/generic/GenericList";
import { reducer, Action } from "./api/useNotificationReducer";
import { Users } from "./components/users";

import "./Home.css";

interface IProps {
  user: User;
  onlineUser: User;
  token: string;
}
export const Home = ({ user, onlineUser, token }: IProps) => {
  const [postssignal, setPostssignal] = useState<boolean>(false);

  const {
    posts,

    getPostOfUser,
    doLikes,
    setInput,
    sendPost,
    createComment,
  } = usePost(token, postssignal);
  const {
    loggedin,
    users,
    loaderUser,
    getUsers,
    addFriend,
    setProfile,
    profile,
    changeProfile,
    loginmessage,
  } = useUser(token);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);
  const [notifications, setNotifications, socket, setSocket] =
    useNotifications();
  const refresh = () => {
    dispatch({ type: "resetPost" });
    setRefreshPosts(true);
  };
  useEffect(() => {
    setPostssignal(true);
    getUsers();

    setProfile(user);
    setPostssignal(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPostssignal(true);
    getUsers();
    setRefreshPosts(false);
    setPostssignal(false);
  }, [refreshPosts]); // eslint-disable-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    likes: [],
    comments: [],
    posts: [],
  });
  useEffect(() => {
    const socketIo = io("localhost:3002");

    socketIo.on("message_from_users", (data) => {
      dispatch({ type: "user", data: data });
    });

    socketIo.on("message_from_comments", (data) =>
      dispatch({ type: "comments", data: data })
    );

    socketIo.on("message_from_likes", (data) =>
      dispatch({ type: "likes", onlineUser: onlineUser, data: data })
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
      uid: onlineUser?._id,
    });

    return () => {
      socketIo.removeListener("message_from_posts");
      socketIo.removeListener("message_from_likes");
      socketIo.removeListener("message_from_comments");
      socketIo.removeListener("message_from_users");
    };
  }, [token, doLikes, sendPost, addFriend]);
  useEffect(() => {
    setProfile(user);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  return (
    <>
      <WhoisOnline
        onlineUser={onlineUser}
        changeProfile={changeProfile}
        token={token}
      />
      <div>
        {JSON.stringify(state)}
        <DndProvider backend={HTML5Backend}>
          {" "}
          <Container notifications={state} />{" "}
        </DndProvider>
        {/* <Menu
          notifications={state}
          login={onlineUser as User}
          refresh={refresh}
        /> */}
      </div>
      <div className="container">
        <div className="leftbar">
          <ProfileLabel
            user={profile}
            changeProfile={changeProfile}
            token={token}
          />
        </div>
        <div className="centerbar" id="wrapper">
          <div className="scrollbar" id="style-1">
            <div className="force-overflow">
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
        </div>
        {JSON.stringify(loggedin)}
        <div className="rightbar">
          <GenericList
            items={users}
            childComp={
              <Users
                item={{} as User}
                onlineUser={onlineUser}
                token={token}
                changeProfile={changeProfile}
                getPostOfUser={getPostOfUser}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
