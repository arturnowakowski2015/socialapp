import {
  Posts,
  User,
  PostInput,
  fetchActionSet,
  CreatePostType,
  DataCreateComment,
} from "../../../model/Interface";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostApi } from "../../../utils/usePostApi";

import { useState } from "react";

const usePost = (token: string, postssignal: boolean) => {
  const { getPostsQuery, addComment, createPost } = usePostApi();
  const [posts, setPosts] = useState<Posts[]>([] as Posts[]);
  const [users, setUsers] = useState<User[]>();

  const [post, setPost] = useState<PostInput>({} as PostInput);
  const { data, refetch } = useQuery({
    queryKey: ["posts", postssignal],
    queryFn: () => getPostsQuery(token),
  });
  const setInput = (id: string, input: string, onlineUser: User) => {
    setPost({ ...post, [id]: input });
  };
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

  const mutatorCreatePost = useMutation({
    mutationFn: async (item: CreatePostType) => {
      return await createPost(item);
    },
  });
  const onCreatePost = (onlineUser: User) => {
    mutatorCreatePost.mutate({
      input: post.input,
      commentPicture: post.imagePath.split("\\")[2],
      picturePath: onlineUser.picturePath as string,
      userid: onlineUser._id,
    });
  };

  useEffect(() => {
    setPosts(mutatorCreatePost.data);
  }, [mutatorCreatePost.data]);

  useEffect(() => {
    setPosts(mutator.data);
  }, [mutator.data]);
  // const sendPost = async (token: string, onlineUser: User) => {
  //   const response = await fetch(`http://localhost:3001/createpost`, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       input: post.input,
  //       commentPicture: post.imagePath,
  //       picturePath: onlineUser.picturePath,
  //       userid: onlineUser._id,
  //     }),
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data1 = await response.json();

  //   console.log(
  //     "rrrrrrrrrrrrrrrrrrrrrrrrrrr               " + JSON.stringify(data1)
  //   );
  //   setPosts(data1);
  // };

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
    onCreatePost,
    createComment,
  };
};

export { usePost };
