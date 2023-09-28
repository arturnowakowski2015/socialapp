import {
  Posts,
  User,
  PostInput,
  fetchActionSet,
  Comment,
  DataCreateComment,
} from "../../../model/Interface";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostsQuery, addComment } from "../../../utils/posts";

import { useState } from "react";

const usePost = (token: string, postssignal: boolean) => {
  const [posts, setPosts] = useState<Posts[]>([] as Posts[]);
  const [users, setUsers] = useState<User[]>();

  const [post, setPost] = useState<PostInput>({} as PostInput);
  const { data, refetch } = useQuery({
    queryKey: ["posts", postssignal],
    queryFn: () => getPostsQuery(token),
  });

  const mutator = useMutation({
    mutationFn: async (item: DataCreateComment) => {
      return await addComment({
        token: item.token,
        userid: item.userid,
        postid: item.postid,
        comment: item.comment,
      });
    },
  });
  useEffect(() => {
    if (data) setPosts(data as Posts[]);
  }, [data]);

  const createComment = async (item: DataCreateComment) => {
    mutator.mutate(item);
  };

  useEffect(() => {
    setPosts(mutator.data);
  }, [mutator.data]);
  // const createComment = async (         userid, postid, comment
  //   user: User,
  //   post: Posts,
  //   comment: string,
  //   token: string
  // ) => {
  //   const response = await fetch(`http://localhost:3001/createcomment`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       userid: post.userId,
  //       postid: post._id,
  //       comment: comment,
  //     }),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const loggedIn = await response.json();
  //   if (loggedIn) {
  //     setPosts(loggedIn);
  //   }
  // };

  const sendPost = async (token: string, onlineUser: User) => {
    const response = await fetch(`http://localhost:3001/createpost`, {
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
    const data1 = await response.json();

    console.log(
      "rrrrrrrrrrrrrrrrrrrrrrrrrrr               " + JSON.stringify(data1)
    );
    setPosts(data1);
  };
  const setInput = (id: string, input: string, onlineUser: User) => {
    setPost({ ...post, [id]: input });
  };
  const doLikes = async (postid: number, token: string, userid?: number) => {
    const response = await fetch(
      `http://localhost:3001/${postid}/${userid}/likes`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data1 = await response.json();
    setPosts(data1);
  };

  const getPostOfUser = async (token: string, url: string) => {};

  return {
    users,
    posts,
    refetch,
    getPostOfUser,
    doLikes,
    setInput,
    sendPost,
    createComment,
  };
};

export { usePost };
