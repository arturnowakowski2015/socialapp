import { useState } from "react";
import { User, IFriend } from "../../../model/Interface";
import { useQuery } from "@tanstack/react-query";
import { getUsersQuery } from "../../../utils/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddF } from "../../../utils/users";

const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = (token: string) => {
  const [loaderUser, setLoaderUser] = useState<boolean>(false);
  const qC = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users", loaderUser],
    queryFn: () => getUsersQuery(token),
  });

  const [loggedin, setLoggedin] = useState<string[]>([] as string[]);
  const loginmessage = (online: string[]) => {
    setLoggedin(online);
  };
  const getUsers = () => {
    setLoaderUser(!loaderUser);
  };
  const mutator = useMutation({
    mutationFn: async (friend: IFriend) => {
      return await AddF(friend);
    },
  });

  const addFriend = (
    login: User,
    token: string,
    userid: number,
    parentFriend?: User
  ) => {
    // alert(JSON.stringify(mutator))
    mutator.mutate({ login, userid, token });
    if (profile?.friends.indexOf(userid.toString()) !== -1) {
      profile?.friends.splice(
        profile?.friends.findIndex((t) => {
          return t === userid.toString();
        }),
        1
      );
    } else {
      profile?.friends.push(userid.toString());
    }
    qC.invalidateQueries(["friends"]);
    setProfile(profile);
  };

  const [profile, setProfile] = useState<User>();
  const changeProfile = async (user: User, token: string, url: string) => {
    const response: any = await fetch(url, {
      // this cannot be 'no-cors'
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data1 = await response.json();
    setProfile(data1);
  };
  return {
    mutator,
    loggedin,
    users,
    loaderUser,
    setProfile,
    profile,
    changeProfile,
    getUsers,
    addFriend,
    loginmessage,
  } as const;
};
export { useUser, useAddFriend };
