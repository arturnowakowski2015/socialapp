import { User, Login } from "../data/Interface";
import {useFetch} from "./useFetch";
import { useState } from "react";
interface Data{
  email:string;
  password:string
}
const useAddFriend = (user: User) => {
  const [addedUser, setAddedUser] = useState<User>(user);

  return [addedUser, setAddedUser] as const;
};

const useUser = () => {
  const [pageType, setPageType] = useState<string>("register");
  const [onlineUser, setOnlineUser] = useState<User>({} as User);
  const [login, setLogin] = useState<Login>({} as Login);
  const [user, setUser] = useState<User>({} as User);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [token, setToken] = useState<string>("");
  const [result, setFetchAction] =useFetch();
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

  const addFriend = async (
    login: User,
    token: string,
    userId: number,
    parentFriend?: User
  ) => { 
    setFetchAction({url:`http://localhost:3000/addfriend/${login && login.email}/${userId}`,
  method:"patch",token:token})
 
    const loggedIn = result;
    if (loggedIn) {
      setOnlineUser(loggedIn);
    }
  };
  const handleSubmit = async (selectedFile: File) => {
    setSelectedFile(selectedFile);
    alert(JSON.stringify(selectedFile));
 
  };

  const register = async (data: User) => {
    const response = await fetch("http://localhost:3000/auth/register/"+data._id, {
      // this cannot be 'no-cors'
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });
 
    const savedUser = await response.json();
    alert("aaa   " + JSON.stringify(savedUser));
    let pt = "/";

    if (savedUser && savedUser.message !== "already exists user") { 
      alert("saved");
      pt = "login";
      setPageType(pt);
    }
  };

  const loginUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    login: Login
  ): Promise<void> => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      // this cannot be 'no-cors'
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: login && login.user && login.user.email, password:login && login.user && login.user.password }),
    });

    const loggedIn = await response.json();
    if (loggedIn) {
      setLogin(loggedIn);
      alert(JSON.stringify)
      setUser(loggedIn.user[0]);
      setOnlineUser(loggedIn.user[0]);
      setToken(loggedIn.token);
      setIsLoggedIn(1);
    }
  };

  const setUserLogin = (el: string, value: string) => {
    if (el) setLogin({ ...login,user:{...login.user, [el]: value }});
  };

 

  const setUserData = (el: string, value: string) => {
    setUser({ ...user, [el]: value });
  };
  return [
    register,
    pageType,
    login,
    user,
    isLoggedIn,

    loginUser,
    onlineUser,
    token,
    setUserLogin,
    setUserData,
    handleSubmit,
    addFriend,
    setPageType,
  ] as const;
};
export { useUser, useAddFriend };
