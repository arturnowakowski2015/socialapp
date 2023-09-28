import { Posts, DataCreateComment } from "../model/Interface";
import { axios } from "./api";

const getPostsQuery = async (token: string): Promise<Posts[]> => {
  const resp = await axios.get<Posts[]>("/p", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

const addComment = async (data: DataCreateComment) => {
  const resp = await axios.patch(
    "/createcomment",
    {
      body: {
        postid: data.postid,
        userid: data.userid,
        comment: data.comment,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return resp.data;
};
export { getPostsQuery, addComment };
