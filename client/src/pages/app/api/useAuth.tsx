import { useRegister } from "./useRegister";
import { useState, useEffect } from "react";
import { Login, User } from "../../../model/Interface";

const useAuth = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [token, setToken] = useState<string>("");
  const [login, setLogin] = useState<Login>({} as Login);
  const [user, setUser] = useState<User>({} as User);
  const [onlineUser, setOnlineUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  let e: boolean = false;
  const { mutator } = useRegister();
  const handleSubmit = async (selectedFile: File) => {
    setSelectedFile(selectedFile);
  };

  const register = (data: User) => {
    // console.log(data, mutator);
    mutator.mutate(data);
    // alert(" ddd  " + JSON.stringify(data));

    //alert(" ddd  " + JSON.stringify(mutator));
    /* if (savedUser && savedUser.message !== "already exists user") {
      alert("saved");
    }
    */
  };
  const [startedloggedin, setStartedloggedin] = useState<string[]>(
    [] as string[]
  );
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
        email:  login?.user?.email,
        password:   login?.user?.password,
      }),
    });

    const loggedIn = await response.json();
    if (loggedIn) {
      setLogin(loggedIn);
      setUser(  loggedIn?.user?.[0]);
      setOnlineUser(  loggedIn?.user?.[0]);
      setToken(loggedIn.token);
      setIsLoggedIn(1);
      setStartedloggedin(loggedIn.online);
    }
  };

  const setUserLogin = (el: string, value: string) => {
    if (el) setLogin({ ...login, user: { ...login.user, [el]: value } });
  };

  const setUserData = (el: string, value: string) => {
    setUser({ ...user, [el]: value });
  };
  const [registerstatus, setRegisterstatus] = useState<string>("");
  useEffect(() => {
    setRegisterstatus("Successfully registered !!");
    const t = setTimeout(() => {
      setRegisterstatus("");
    }, 2500);
    return () => clearTimeout(t);
  }, [mutator.isSuccess]);
  return {
    startedloggedin,
    registerstatus,
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
  } as const;
};
export { useAuth };
