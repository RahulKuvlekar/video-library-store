import { createContext, useReducer, useEffect } from "react";
import { historyReducer } from "../Reducer/historyReducer";
import { getHistoryList } from "../Utils/history";
import { useAuthContext } from "../Hooks/useAuthContext";

const HistoryContext = createContext({
  historyState: { historyList: Array },
  dispatchHistory: Function,
});

const HistoryProvider = ({ children }) => {
  const INITIAL_STATE = {
    historyList: [],
  };
  const {
    authState: { token, isAuthenticated },
  } = useAuthContext();
  const [historyState, dispatchHistory] = useReducer(
    historyReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (isAuthenticated) {
      getHistoryList(dispatchHistory, token);
    }
  }, [isAuthenticated, token]);
  return (
    <HistoryContext.Provider value={{ historyState, dispatchHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryProvider };
