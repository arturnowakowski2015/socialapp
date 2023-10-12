import { Posts, DataCreateComment, CreatePostType } from "../model/Interface";
import { useAxios } from "../pages/app/api/useAxios";

const usePostApi = () => {
  const axiosClient = useAxios();

  const getPostsQuery = async (token: string): Promise<Posts[]> => {
    const resp = await axiosClient.get<Posts[]>("/p");
    return resp.data;
  };

  const addComment = async (data: DataCreateComment) => {
    const resp = await axiosClient.patch("/createcomment", {
      body: {
        postid: data.postid,
        userid: data.userid,
        comment: data.comment,
      },
    });
    return resp.data;
  };

  const createPost = async (body: CreatePostType) => {
    const resp = await axiosClient.post(`/posts`, body);
    return resp.data;
  };
  return { getPostsQuery, addComment, createPost };
};

export { usePostApi };
