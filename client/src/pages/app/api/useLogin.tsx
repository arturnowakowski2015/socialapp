import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../../../model/Interface";
import { Login } from "../../../utils/auth";
const useLogin = () => {
  const mutator = useMutation({
    mutationFn: (newOne: LoginData) => {
      return Login("", newOne);
    },
  });

  return { mutator };
};
export { useLogin };
