import { User } from "../data/Interface";
import { useNavigate } from "react-router-dom";
import DropImage from "../components/DropImage";
import "../pages/Auth.css";
interface IProps {
  user: User;
  setUserData: (el: string, value: string) => void;
  register: (data: User) => Promise<void>;
}
const RegisterPage = ({ setUserData, register, user }: IProps) => {
  const navigate = useNavigate();
  return ( 
    <>
      {" "}
      <div className="registerContainer">
        <form action="">
          {" "}
          <h1>register Your Data </h1>
          <br></br>
          <input
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUserData("password", e.target.value)}
          />
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUserData("email", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="firstName"
            value={user.firstName}
            onChange={(e) => setUserData("firstName", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="lastName"
            value={user.lastName}
            onChange={(e) => setUserData("lastName", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="location"
            value={user.location as string}
            onChange={(e) => setUserData("location", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="occupation"
            value={user.ocupation}
            onChange={(e) => setUserData("occupation", e.target.value)}
          />
          <br></br>
          <DropImage
            handleFileInput={(e) => {
              setUserData("picturePath", e.split("\\")[2]);
            }}
          />
          <button
            onClick={() => {
              register(user);
              navigate("/login");
            }}
          >
            register
          </button>
        </form>{" "}
        <br></br>
        <br></br>
        <button onClick={() => navigate("/login")}>login</button>
      </div>
    </>
  );
};
export default RegisterPage;
