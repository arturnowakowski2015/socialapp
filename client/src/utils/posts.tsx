import { Posts, User } from "../model/Interface";
import { axios } from "./api";

const getPostsQuery = async (token: string): Promise<Posts[]> => {
  const resp = await axios.get<Posts[]>("/p", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
export { getPostsQuery };
