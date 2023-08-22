import Axios from "axios";
 const BASE_URL = "http://localhost:3000";
export const axios = Axios.create({
  baseURL: BASE_URL
});
/*
export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      ...params,
    }),
  post: (url: string, data: any) => axios.post(url, data, {}),
  put: <T>(url: string, data: any) => axios.put<T>(url, data, {}),
  patch: (url: string, {},data: any) => axios.patch(url, {},data),
  delete: <T>(url: string) => axios.delete<T>(url, {}),
};
*/