import { User } from "../model/Interface";
import { axios } from "./api";

const Register = async (url: string, data: User) => {
  const resp = await axios.put("/auth/" + url, data);
  return resp;
};
export { Register };
