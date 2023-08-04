import { User, IFriend } from "../model/Interface";
import { api, BASE_URL } from "./api";

const getUsersQuery = async (token: string): Promise<User[]> => {
  const resp = await api.get<User[]>(BASE_URL + "/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
const AddFriend = async (friend: IFriend) => {
  const resp = await api.patch<User[]>(
    BASE_URL +
      "addfriend/" +
      (friend.login && friend.login.email) +
      "/" +
      friend.userid,
    {
      headers: {
        Authorization: `Bearer ${friend.token}`,
      },
    }
  );
  return resp.data;
};
export { getUsersQuery, AddFriend };
