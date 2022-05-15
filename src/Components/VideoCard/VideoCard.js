import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";
import "./VideoCard.css";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ videoInfo }) => {
  const { _id, title, creator, timeStamp, views, thumbnail, creatorImg } =
    videoInfo;

  const navigate = useNavigate();

  const ViewVideoCard = () => navigate(`/explore/${_id}`);

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
