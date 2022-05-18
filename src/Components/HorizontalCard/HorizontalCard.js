import React from "react";
import "./HorizontalCard.css";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { addToHistoryList, deleteFromHistoryList } from "../../Utils/history";

const HorizontalCard = ({ videoInfo, onDelete }) => {
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

  return (
    <article className="horizontal-card-section" onClick={ViewHistoryCard}>
      <img src={thumbnail} alt={title} className="horizontal-card-img" />
      <div className="horizontal-card-info">
        <span className="horizontal-card-title">
          <h2>{title}</h2>
          <FaTrashAlt
            className="horizontal-card-deleteBtn"
            onClick={onDelete}
          />
        </span>
        <div className="horizontal-card-creatorInfo">
          <h3>
            <img src={creatorImg} alt={creator} className="avatar avatar-sm" />{" "}
            {creator}
          </h3>
          <h3>{views}</h3>
        </div>
        <p className="horizontal-card-description">{description}</p>
      </div>
    </article>
  );
};

export default HorizontalCard;
