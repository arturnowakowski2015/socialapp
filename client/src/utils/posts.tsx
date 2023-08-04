import { Posts, User } from "../model/Interface";
import { api, BASE_URL } from "./api";

const getPostsQuery = async (token: string): Promise<Posts[]> => {
  const resp = await api.get<Posts[]>(BASE_URL + "/p", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
export { getPostsQuery };
