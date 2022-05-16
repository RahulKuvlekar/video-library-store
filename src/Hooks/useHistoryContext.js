import { useContext } from "react";
import { HistoryContext } from "../Context/HistoryContext";

const useHistoryContext = () => useContext(HistoryContext);

export default useHistoryContext;
