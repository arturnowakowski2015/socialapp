import { User } from "../model/Interface";
import { api } from "./api";

const BASE_URL = "http://localhost:3000/auth/";

const Register = async (url: string, data: User) => {
  return (
    await api.put<any>(BASE_URL + url, data),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
};
export { Register };
