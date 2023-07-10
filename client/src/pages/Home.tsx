import usePost from "../hooks/usePost";
import { useEffect, useState } from "react";
import { User, Login, Notifications } from "../data/Interface";
import PostCard from "../components/PostCard";
import ProfileLabel from "../components/ProfileLabel";
import Owner from "../components/Owner";
import CreatePostCard from "../components/CreatePostCard";
import io from "socket.io-client";import useNotifications from "../hooks/useNotifications";
import "./Home.css";
interface Data{
  text:string;
  uid:number;
  flag:number;
  flag1:number
}
interface IProps { 
  user: User;
  login: Login;
  onlineUser: User;
  token: string;
  addFriend: (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => void;
}
const Home = ({  user, login, onlineUser, token, addFriend }: IProps) => {
  const [
    posts,
    users,
    profile,
    setProfile,
    getPosts,
    getUsers,
    changeProfile,
    getPostOfUser,
    doLikes,
    setInput,
    sendPost,
    createComment,
  ] = usePost();  const [refreshPosts, setRefreshPosts]=useState<boolean>(false)
  const [notifications, setNotifications,socket, setSocket] =useNotifications();
 const refresh = () => setRefreshPosts(true);
   useEffect(() => {
    getPosts(login.token, "http://localhost:3000/p");
    getUsers(login.token, "http://localhost:3000/users");
 

    setProfile(user);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
   getPosts(login.token, "http://localhost:3000/p");
   getUsers(login.token, "http://localhost:3000/users");
  setNotifications({users:[],
  likes:[],
  comments:[],
  posts:[]})
 }, [refreshPosts]); // eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => {
 
    const socketIo = io("localhost:3002");
 
    const dot_user = (data:Data) => {alert("users "+(data.flag))
      if(notifications && notifications.users&& notifications.users.indexOf(data.text)!=-1){
        if(1!=data.flag1 ){notifications.users.pop();alert("pop")
      }
     } else{notifications.users.unshift(data.text);alert("push") }
     setNotifications({...notifications, users: notifications.users});   }
    socketIo.on('message_from_users', dot_user); 
 
    const dot_comments =  (data:Data) => { 
      if(notifications && notifications.comments && notifications.comments.indexOf(data.text)===-1) {
        alert("ddd   "+data.text)
        notifications && notifications.comments && notifications.comments.unshift(data.text)
       setNotifications({...notifications, comments :notifications.comments});
      }
      console.log("bb              "+JSON.stringify( notifications.comments))
    } 
    socketIo.on('message_from_comments', dot_comments); 
    const dot_likes = (data:Data)=>{ alert("likes "+JSON.stringify(data))
      if(Number(onlineUser._id)===Number(data.uid) ) {
        if(data.flag==1)
        notifications &&notifications.likes &&  notifications.likes.unshift(data.text);
        else notifications.likes.pop()
       }setNotifications({...notifications, likes:notifications.likes});
    }
    socketIo.on('message_from_likes', dot_likes);
    const dot_posts = (data:Data) => {alert(JSON.stringify(data))
      if(Number(onlineUser._id)!==data.uid)notifications.posts.unshift(data.text) 
      setNotifications({...notifications, posts :  notifications.posts  });
      alert(JSON.stringify(notifications)+":::"+JSON.stringify(data))
    }
   
    socketIo.on('message_from_posts', dot_posts);
   
    socketIo.on('disconnect', function (data:string) {   
      console.log('disconnect');     
    });

 
    socketIo.emit('message_about_userid', {uid :onlineUser._id});
    
    return ()=>{socketIo.removeListener("message_from_posts")
  socketIo.removeListener("message_from_likes");
  socketIo.removeListener('message_from_comments')
  socketIo.removeListener("message_from_users");
}
  
  }, [login, doLikes, sendPost, addFriend]); 
  useEffect(() => {
    setProfile(user);
   }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <Owner notifications={notifications} login={onlineUser as User} refresh={()=>refresh()}/>
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
            />
            {posts &&
              posts.map((t) => {
                return (
                  <PostCard
                    post={t}
                    users={users}
                    login={login}
                    doLikes={doLikes}
  
                    onlineUser={onlineUser} 
                    token={token}
                    addFriend={addFriend}
                    createComment={createComment}
                  />
                );
              })}
          </div>
        </div>
        <div className="rightbar">
          {users?.map((t) => {
            return (
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
                {t.firstName}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
