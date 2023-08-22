import { User, IFriend } from "../model/Interface";
import { axios } from "./api";
const getUsersQuery = async (token: string): Promise<User[]> => {
  const resp = await axios.get<User[]>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};
const AddF = async (friend: IFriend): Promise<User> => {
  const resp = await axios.patch <User>( 
      "/addfriend/" +
      (friend.login && friend.login.email) +
      "/" +
      friend.userid,{},{
          headers: {
     Authorization: `Bearer ${friend.token}`,
        
      },
    }
  );
  return resp.data;
};
export { getUsersQuery, AddF };
 