import { createContext } from "react";

export const AuthContext = createContext({
  isLogedIn: false,
  token: null,
  userId: null,
  username: null,
  data: null,
  tel: null,
  login: () => {},
  logout: () => {},
});
