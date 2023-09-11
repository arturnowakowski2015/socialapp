import { Login } from "../../model/Interface";
import { useNavigate } from "react-router-dom";
import { User } from "../../model/Interface";
import axios from "axios";

import { useState } from "react";

import "./LoginPage.css";

interface IProps {
  registerstatus: string;
  loginn: Login;
  setUserLogin: (email: string, password: string) => void;

  loginUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    login: Login
  ) => Promise<void>;
}

export const LoginPage = ({
  registerstatus,
  loginn,
  setUserLogin,
  loginUser,
}: IProps) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<Login>({} as Login);
  const [user, setUser] = useState<User>({} as User);
  const [onlineUser, setOnlineUser] = useState<User>({} as User);

  const Register = async (url: string, data: User) => {
    const resp = await axios.put("/auth/register", {
      email: "q@q.pl",
      password: "q",
    });
    return resp;
  };

  // const loginUserq = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ): Promise<void> => {
  //   e.preventDefault();
  //   const resp = await axios.put("http://localhost:3001/auth/register", {
  //     email: "q@q.pl",
  //     password: "q",
  //   });
  //   const response = await fetch("http://localhost:3001/login", {
  //     // this cannot be 'no-cors'
  //     headers: { "Content-Type": "application/json" },
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: "q@q.pl",
  //       password: "q",
  //     }),
  //   });

  //   const loggedIn = await response.json();
  //   if (loggedIn) {
  //     setLogin(loggedIn);
  //     setUser(loggedIn?.user?.[0]);
  //     setOnlineUser(loggedIn?.user?.[0]);
  //   }
  //   navigate("/home");
  // };

  return (
    <>
      {registerstatus !== "" && <div>successfully registered !!</div>}
      <div className="containerLogin">
        {JSON.stringify(loginn)}
        <form action="">
          <input
            type="password"
            placeholder="password"
            value={loginn && loginn.user && loginn.user.password}
            onChange={(e) => setUserLogin("password", e.currentTarget.value)}
          />
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={loginn && loginn.user && loginn.user.email}
            onChange={(e) => setUserLogin("email", e.currentTarget.value)}
          />
          <br></br>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              loginUser(e, loginn);
              navigate("/home");
            }}
          >
            login
          </button>
        </form>

        <br></br>
        <button onClick={() => navigate("/register")}>register</button>
      </div>
    </>
  );
};
