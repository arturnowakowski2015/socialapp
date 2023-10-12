import axios from "axios";
import { useMemo } from "react";

import { useTokenContext } from "../../../context/tokenContext/useTokenContext";

export const useAxios = () => {
  const { accessToken } = useTokenContext();

  const axiosClient = useMemo(() => {
    return axios.create({
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: "http://localhost:3001",
    });
  }, [accessToken]);

  return axiosClient;
};

export const { isAxiosError } = axios;
