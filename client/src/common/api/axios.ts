import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (res) => res,
//   (error: AxiosError) => {
//     const status = error.response?.status ?? 0;
//     const isAuthError = status === 401 || status === 403;

//     if (isAuthError && window.location.pathname !== "/sign-in") {
//       sessionStorage.removeItem("user");
//       window.location.href = "/sign-in";
//     }
//     return Promise.reject(error);
//   }
// );
