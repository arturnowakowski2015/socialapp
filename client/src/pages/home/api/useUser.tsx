import useFetch from "./useFetch";
import { useState } from "react";
import { User, IFriend } from "../../../model/Interface";
import { useQuery } from "@tanstack/react-query";
import { getUsersQuery } from "../../../utils/users";
import { useMutation } from "@tanstack/react-query";
import { AddFriend } from "../../../utils/users";

const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = (token: string) => {
  const [loaderUser, setLoaderUser] = useState<boolean>(false);

  const { data: users } = useQuery({
    queryKey: ["groups", loaderUser],
    queryFn: () => getUsersQuery(token),
  });

  const { loader, setParams } = useFetch();
  /*
  event.preventDefault(); if (selectedFile) {
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
        const response = await fetch('https://<server_ip>/api/v1/upload', { method: 'POST', body: formData, });
        if (response.ok) {
            console.log('Upload successful');
        }
    } catch (error) {
        console.error(error);
    }
}
*/
  const [loggedin, setLoggedin] = useState<string[]>([] as string[]);
  const loginmessage = (online: string[]) => {
    setLoggedin(online);
    alert(JSON.stringify(online));
  };
  const getUsers = async () => {
    setLoaderUser(!loaderUser);
  };

  const mutator = useMutation({
    mutationFn: (friend: IFriend) => {
      return AddFriend(friend);
    },
  });

  const addFriend = async (
    login: User,
    token: string,
    userid: number,
    parentFriend?: User
  ) => {
    mutator.mutate({ login, userid, token });
  };

  return {
    mutator,
    loggedin,
    users,
    loaderUser,
    loader,
    getUsers,
    addFriend,
    loginmessage,
  } as const;
};
export { useUser, useAddFriend };
