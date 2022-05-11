import { createContext, useReducer } from "react";
import { authReducer } from "../Reducer/authReducer";

const AuthContext = createContext({
  authState: {
    isAuthenticated: Boolean,
    token: String,
    userInfo: String,
  },
  dispatchAuth: Function,
});

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    isAuthenticated: localStorage.getItem("isAuth") || false,
    token: localStorage.getItem("token") || null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  });

  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
