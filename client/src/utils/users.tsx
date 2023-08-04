import { User } from "../model/Interface";
import { api, BASE_URL } from "./api";

const getUsersQuery = async (token: string): Promise<User[]> => {
  const resp = await api.get<User[]>(BASE_URL + "/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
export { getUsersQuery };
