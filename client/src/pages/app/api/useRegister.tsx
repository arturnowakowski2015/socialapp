import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../../model/Interface";
import { Register } from "../../../utils/auth";
import { useState } from "react";
import axios from "axios";
const useRegister = () => {
  const queryClient = useQueryClient();
  const BASE_URL = "http://localhost:3000/auth/register";
  const mutator = useMutation({
    mutationFn: (newTodo: User) => {
      return Register("register", newTodo);
    },
    onSuccess: () => {
      alert(9);
    },
  });

  return { mutator };
};
export { useRegister };
