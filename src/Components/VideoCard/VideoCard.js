import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";
import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { addToHistoryList, deleteFromHistoryList } from "../../Utils/history";
import useHistoryContext from "../../Hooks/useHistoryContext";
import { useAuthContext } from "../../Hooks/useAuthContext";

const VideoCard = ({ videoInfo }) => {
  const { _id, title, creator, timeStamp, views, thumbnail, creatorImg } =
    videoInfo;

  const {
    historyState: { historyList },
    dispatchHistory,
  } = useHistoryContext();
  const {
    authState: { token },
  } = useAuthContext();
  const navigate = useNavigate();

  const ViewVideoCard = () => {
    navigate(`/explore/${_id}`);
    if (historyList.find((video) => video._id === _id)) {
      deleteFromHistoryList(dispatchHistory, token, _id);
    }
    addToHistoryList(dispatchHistory, token, videoInfo);
  };

  return (
    <div className="videoCard-section" onClick={ViewVideoCard}>
      <img src={thumbnail} alt={title} className="videoCard-thumbnail" />
      <div className="videoCard-info">
        <div className="videoCard-heading">
          <img
            src={creatorImg}
            alt={creator}
            className="videoCard-creator-img avatar "
          />
          <h3 className="videoCard-title">{title}</h3>
        </div>
        <div className="videoCard-body">
          <span className="videoCard-creator">
            {creator}
            <FaCheckCircle />
          </span>
          <span className="videoCard-videoInfo">
            <span className="videoCard-views">{views} views</span>

            <span className="videoCard-date">
              {moment(timeStamp).fromNow()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
