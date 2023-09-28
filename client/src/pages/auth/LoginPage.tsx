import { Login } from "../../model/Interface";
import { useNavigate } from "react-router-dom";
import { User } from "../../model/Interface";
import axios from "axios";

import { useState } from "react";

import "./LoginPage.css";

interface IProps {
  registerstatus: string;
  login: Login;
  setUserLogin: (email: string, password: string) => void;

  loginUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    login: Login
  ) => Promise<void>;
}

export const LoginPage = ({
  registerstatus,
  login,
  setUserLogin,
  loginUser,
}: IProps) => {
  const Register = async (url: string, data: User) => {
    const resp = await axios.put("/auth/register", {
      email: "q@q.pl",
      password: "q",
    });
    return resp;
  };
  const navigate = useNavigate();
  return (
    <>
      {registerstatus !== "" && <div>successfully registered !!</div>}
      <div className="containerLogin">
        {JSON.stringify(login)}
        <form action="">
          <input
            type="password"
            placeholder="password"
            value={login && login.user && login.user.password}
            onChange={(e) => setUserLogin("password", e.currentTarget.value)}
          />
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={login && login.user && login.user.email}
            onChange={(e) => setUserLogin("email", e.currentTarget.value)}
          />
          <br></br>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              loginUser(e, login);
              // navigate("/home");
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
