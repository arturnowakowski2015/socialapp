import useFetch from "./useFetch";
import { useState } from "react";
import { User, fetchActionSet } from "../../../model/Interface";
import { useQuery } from "@tanstack/react-query";
import { getUsersQuery } from "../../../utils/users";
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
  const addFriend = async (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => {
    return await fetch(
      `http://localhost:3000/addfriend/${login && login.email}/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return {
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
