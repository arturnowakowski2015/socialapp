import { useMutation } from "@tanstack/react-query";
import { User } from "../../../model/Interface";
import { Register } from "../../../utils/auth";
const useRegister = () => {
  const mutator = useMutation({
    mutationFn: (newTodo: User) => {
      return Register("register", newTodo);
    },
  });

  return { mutator };
};
export { useRegister };
