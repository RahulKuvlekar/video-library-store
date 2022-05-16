import React from "react";
import HistoryCard from "../../Components/HistoryCard/HistoryCard";
import "./History.css";
import { FaTrashAlt } from "react-icons/fa";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { deleteAllHistoryList } from "../../Utils/history";

const History = () => {
  const {
    historyState: { historyList },
    dispatchHistory,
  } = useHistoryContext();
  const {
    authState: { token },
  } = useAuthContext();

  const clearAllHistory = () => deleteAllHistoryList(dispatchHistory, token);

  return (
    <div className="history-section">
      <div className="page-title page-title-space-btw">
        <h2>History ({historyList.length})</h2>
        {historyList.length !== 0 && (
          <button className="btn btn-primary" onClick={clearAllHistory}>
            <FaTrashAlt />
            &nbsp; Clear All
          </button>
        )}
      </div>
      <div className="history-section-videolisting">
        {historyList &&
          [...historyList]
            .reverse()
            .map((video) => (
              <HistoryCard
                key={`History-Card-${video._id}`}
                videoInfo={video}
              />
            ))}
      </div>
    </div>
  );
};

export default History;
