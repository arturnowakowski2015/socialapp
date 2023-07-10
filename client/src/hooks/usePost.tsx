import { Posts, User, PostInput } from "../data/Interface";
import { useState } from "react";

const usePost = () => {
  const [posts, setPosts] = useState<Posts[]>();
  const [users, setUsers] = useState<User[]>();
  const [profile, setProfile] = useState<User>();
  const [post, setPost] = useState<PostInput>({} as PostInput);

  const createComment = async (user:User, post: Posts, comment: string, token: string) => {
    alert(user._id + ":u:" + comment);
    const response = await fetch(
      `http://localhost:3000/createcomment`,
      { 
        method: "PATCH",
        body:JSON.stringify({userid:post.userId, postid:post._id, comment:comment}),
                headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const loggedIn = await response.json();
    if (loggedIn) {
      setPosts(loggedIn);
    }
  };

  const sendPost = async (token: string, onlineUser: User) => {
    alert("kkk" + onlineUser.picturePath + "patg" + post.imagePath);
    const response = await fetch(`http://localhost:3000/createpost`, {
      method: "PATCH",
      body: JSON.stringify({
        input: post.input,
        commentPicture: post.imagePath,
        picturePath: onlineUser.picturePath,
        userid: onlineUser._id,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(
      "rrrrrrrrrrrrrrrrrrrrrrrrrrr               " + JSON.stringify(data)
    );
    setPosts(data);
  };
  const setInput = (id: string, input: string, onlineUser: User) => {
    setPost({ ...post, [id]: input });
  };
  const doLikes = async (postid: number, token: string, userid?: number) => {
    const response = await fetch(
      `http://localhost:3000/${postid}/${userid}/likes`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setPosts(data);
  };

  const getPostOfUser = async (token: string, url: string) => {
    const response: any = await fetch(url, {
      // this cannot be 'no-cors'
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setPosts(data);
  };
  const changeProfile = async (user: User, token: string, url: string) => {
    const response: any = await fetch(url, {
      // this cannot be 'no-cors'
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setProfile(data);
  };

  const getPosts = async (token: string, url: string) => {
    const response: any = await fetch(url, {
      // this cannot be 'no-cors'
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setPosts(data);
  };
  const getUsers = async (token: string, url: string) => {
    const response: any = await fetch(url, {
      // this cannot be 'no-cors'
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUsers(data);
  };
  return [
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
  ] as const;
};

export default usePost;
