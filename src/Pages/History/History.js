import React from "react";
import HorizontalCard from "../../Components/HorizontalCard/HorizontalCard";
import "./History.css";
import { FaTrashAlt } from "react-icons/fa";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { deleteAllHistoryList } from "../../Utils/history";
import { deleteFromHistoryList } from "../../Utils/history";

const History = () => {
  const {
    historyState: { historyList },
    dispatchHistory,
  } = useHistoryContext();
  const {
    authState: { token },
  } = useAuthContext();

  const clearAllHistory = () => deleteAllHistoryList(dispatchHistory, token);

  const deleteCard = (event, _id) => {
    event.stopPropagation();
    deleteFromHistoryList(dispatchHistory, token, _id);
  };

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
              <HorizontalCard
                key={`History-Card-${video._id}`}
                videoInfo={video}
                onDelete={(event) => deleteCard(event, video._id)}
              />
            ))}
      </div>
    </div>
  );
};

export default History;
