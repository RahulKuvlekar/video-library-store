import React from "react";
import HorizontalCard from "../../Components/HorizontalCard/HorizontalCard";
import "./History.css";
import { FaTrashAlt } from "react-icons/fa";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { deleteAllHistoryList } from "../../Utils/history";
import { deleteFromHistoryList } from "../../Utils/history";
import { Link } from "react-router-dom";
import { useToastContext } from "../../Hooks/useToastContext";

const History = () => {
  const {
    historyState: { historyList },
    dispatchHistory,
  } = useHistoryContext();
  const {
    authState: { token },
  } = useAuthContext();

  const { dispatchToast } = useToastContext();

  const clearAllHistory = () =>
    deleteAllHistoryList(dispatchHistory, token, dispatchToast);

  const deleteCard = (event, _id) => {
    event.stopPropagation();
    deleteFromHistoryList(dispatchHistory, token, _id, dispatchToast);
  };

  return (
    <div className="history-section">
      {historyList.length === 0 && (
        <div className="not-available">
          <h1>No History is available </h1>
          <Link to="/explore" className="btn btn-outline-primary">
            Let's Explore
          </Link>
        </div>
      )}
      <div className="page-title page-title-space-btw">
        {historyList.length !== 0 && (
          <React.Fragment>
            <h2>History ({historyList.length})</h2>
            <button className="btn btn-primary" onClick={clearAllHistory}>
              <FaTrashAlt />
              &nbsp; Clear All
            </button>
          </React.Fragment>
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
