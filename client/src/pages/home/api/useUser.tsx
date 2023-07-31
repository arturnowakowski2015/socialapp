import useFetch from "./useFetch";
import { useState } from "react";
import { User, fetchActionSet } from "../../../model/Interface";

const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = () => {
  const [loaderUser, setLoaderUser] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([] as User[]);

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
  const getUsers = async (ac: fetchActionSet) => {
    setLoaderUser(true);

    setUsers(
      (await setParams({
        type: "get",
        url: ac.url,
        token: ac.token,
        data: [],
      })) as User[]
    );

    setLoaderUser(false);
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

  return { users, loaderUser, loader, getUsers, addFriend } as const;
};
export { useUser, useAddFriend };
