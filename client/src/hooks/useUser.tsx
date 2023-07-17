import { User, Login } from "../data/Interface";
import useFetch from "./useFetch";
import { useState } from "react";
import { fetchActionSet } from "../data/Interface";

const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = () => {
  const [pageType, setPageType] = useState<string>("register");
  const [loaderUser, setLoaderUser] = useState<boolean>(false);
  const [onlineUser, setOnlineUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const [users, setUsers] = useState<User[]>([] as User[]);

  const [loader, setParams] = useFetch();
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
    const res = await fetch(
      `http://localhost:3000/addfriend/${login && login.email}/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetch("/movies");
    const movies = await response.json();
    return movies;
    alert(JSON.stringify(res));
    const loggedIn = await res.json();
  };

  return [users, loaderUser, getUsers, addFriend] as const;
};
export { useUser, useAddFriend };
