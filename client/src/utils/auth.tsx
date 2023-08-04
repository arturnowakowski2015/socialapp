import { User } from "../model/Interface";
import { api, BASE_URL } from "./api";

const Register = async (url: string, data: User) => {
  const resp = await api.put<any>(BASE_URL + "/auth/" + url, data);
  return resp;
};
export { Register };
