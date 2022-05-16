import React from "react";
import "./HistoryCard.css";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { addToHistoryList, deleteFromHistoryList } from "../../Utils/history";

const HistoryCard = ({ videoInfo }) => {
  const { _id, title, creator, creatorImg, views, thumbnail, description } =
    videoInfo;

  const {
    authState: { token },
  } = useAuthContext();
  const {
    historyState: { historyList },
    dispatchHistory,
  } = useHistoryContext();

  const navigate = useNavigate();

  const ViewHistoryCard = () => {
    navigate(`/explore/${_id}`);
    if (historyList.find((video) => video._id === _id)) {
      deleteFromHistoryList(dispatchHistory, token, _id);
    }
    addToHistoryList(dispatchHistory, token, videoInfo);
  };

  const deleteCard = (event) => {
    event.stopPropagation();
    deleteFromHistoryList(dispatchHistory, token, _id);
  };

  return (
    <article className="history-card-section" onClick={ViewHistoryCard}>
      <img src={thumbnail} alt={title} className="history-card-img" />
      <div className="history-card-info">
        <span className="history-card-title">
          <h2>{title}</h2>
          <FaTrashAlt className="history-card-deleteBtn" onClick={deleteCard} />
        </span>
        <div className="history-card-creatorInfo">
          <h3>
            <img src={creatorImg} alt={creator} className="avatar avatar-sm" />{" "}
            {creator}
          </h3>
          <h3>{views}</h3>
        </div>
        <p className="history-card-description">{description}</p>
      </div>
    </article>
  );
};

export default HistoryCard;
