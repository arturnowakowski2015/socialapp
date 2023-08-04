import { Login } from "../../model/Interface";
import { useNavigate } from "react-router-dom";
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
