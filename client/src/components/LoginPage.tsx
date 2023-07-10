import { Login } from "../data/Interface";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

interface IProps {
  loginn: Login;
  setUserLogin: (email: string, password: string) => void;

  loginUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    login: Login
  ) => Promise<void>;
} 

const LoginPage = ({ loginn, setUserLogin, loginUser }: IProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="containerLogin">
        <form action="">
          <input
            type="password"
            placeholder="password"
            value={loginn && loginn.password}
            onChange={(e) => setUserLogin("password", e.currentTarget.value)}
          />
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={loginn && loginn.email}
            onChange={(e) => setUserLogin("email", e.currentTarget.value)}
          />
          <br></br>
          <button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              loginUser(e, loginn as Login);
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
export default LoginPage;
