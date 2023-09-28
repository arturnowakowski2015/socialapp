import { User, LoginData } from "../model/Interface";
import { axios } from "./api";

const Register = async (url: string, data: User) => {
  const resp = await axios.put("/auth/" + url, data);
  return resp;
};

const Login = (url: string, data: LoginData) => {
  return axios.post("/login", data);
};
export { Register, Login };
/*
   axios
      .post("https://example.con/login", { email, password })
      .then(response => {
        console.log(response)
        // Handle response
      })
const response = await fetch("http://localhost:3001/login", {
  // this cannot be 'no-cors'
  headers: { "Content-Type": "application/json" },
  method: "POST",
  body: JSON.stringify({
    email: login?.user?.email,
    password: login?.user?.password,
  }),
});*/
