import { useState } from "react";
import { Login, User } from "../../../model/Interface";
const useAuth = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [token, setToken] = useState<string>("");
  const [login, setLogin] = useState<Login>({} as Login);
  const [user, setUser] = useState<User>({} as User);
  const [onlineUser, setOnlineUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const handleSubmit = async (selectedFile: File) => {
    setSelectedFile(selectedFile);
    alert(JSON.stringify(selectedFile));
  };

  const register = async (data: User) => {
    const response = await fetch("http://localhost:3000/auth/register", {
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
      body: JSON.stringify({
        email: login && login.user && login.user.email,
        password: login && login.user && login.user.password,
      }),
    });

    const loggedIn = await response.json();
    if (loggedIn) {
      setLogin(loggedIn);
      alert(JSON.stringify);
      setUser(loggedIn.user[0]);
      setOnlineUser(loggedIn.user[0]);
      setToken(loggedIn.token);
      setIsLoggedIn(1);
    }
  };

  const setUserLogin = (el: string, value: string) => {
    if (el) setLogin({ ...login, user: { ...login.user, [el]: value } });
  };

  const setUserData = (el: string, value: string) => {
    setUser({ ...user, [el]: value });
  };

  return [
    login,
    user,
    loginUser,
    isLoggedIn,
    onlineUser,
    token,
    setUserLogin,
    register,
    handleSubmit,
    setUserData,
  ] as const;
};
export { useAuth };
