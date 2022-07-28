import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { authFeatures, GET_NOTES } from "../Constant/constant";
import { authReducer } from "../Reducer/authReducer";

const AuthContext = createContext({
  authState: {
    isAuthenticated: Boolean,
    token: String,
    userInfo: String,
    notes: Array,
  },
  dispatchAuth: Function,
});

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, {
    isAuthenticated: localStorage.getItem("isAuth") || false,
    token: localStorage.getItem("token") || null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    notes: [],
  });

  const { SET_NOTES } = authFeatures;

  useEffect(() => {
    (async () => {
      if (!authState.isAuthenticated) return;
      try {
        const { status, data } = await axios.get(GET_NOTES, {
          headers: { authorization: authState.token },
        });
        if (status === 200) {
          const { notes } = data;
          dispatchAuth({ type: SET_NOTES, payload: notes });
        }
      } catch (error) {
        console.log(error?.message);
      }
    })();

    //eslint-disable-next-line
  }, [authState.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ authState, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
