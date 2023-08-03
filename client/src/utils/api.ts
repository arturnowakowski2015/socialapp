import axios from "axios";

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: any) => axios.post<T>(url, data, {}),
  put: <T>(url: string, data: any) => axios.put<T>(url, data, {}),
  patch: <T>(url: string, data: any) => axios.patch<T>(url, data, {}),
  delete: <T>(url: string) => axios.delete<T>(url, {}),
};
