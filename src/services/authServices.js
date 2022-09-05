import httpRequest, * as request from "../utils/httpRequests";

export const validate = () =>
  request.get("validate", { withCredentials: true });

export const register = (data) => request.post("register", data);

export const login = (data) =>
  request.post("login", data, { withCredentials: true });

export const logout = () => request.get('logout',{ withCredentials: true })