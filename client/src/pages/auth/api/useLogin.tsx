import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../../../model/Interface";
import { Login } from "../../../utils/auth";
import { useState } from "react";
const useLogin = () => {
  const [err, setErr] = useState<string>("");
  const mutator = useMutation({
    mutationFn: (newOne: LoginData) => {
      return Login("", newOne);
    },
    onError: (error: any) => {
      setErr(error.response.data.msg);
    },
  });

  return { mutator, err };
};
export { useLogin };
