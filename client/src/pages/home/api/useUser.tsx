import useFetch from "./useFetch";
import { useState } from "react";
import { User, IFriend } from "../../../model/Interface";
import { useQuery } from "@tanstack/react-query";
import { getUsersQuery } from "../../../utils/users";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import { AddF } from "../../../utils/users";

const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = (token: string) => {
  const [loaderUser, setLoaderUser] = useState<boolean>(false);

  const { data: users } = useQuery({
    queryKey: ["users", loaderUser],
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
    const qC = useQueryClient();
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
     if(profile?.friends.indexOf(userid.toString())!==-1)
     profile?.friends.splice(profile?.friends.findIndex((t)=>{return t===userid.toString()}),1)
     else profile?.friends.push(userid.toString())
     setProfile(profile)
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
    loader,
    setProfile, profile,changeProfile,
    getUsers,
    addFriend,
    loginmessage,
  } as const;
};
export { useUser, useAddFriend };
