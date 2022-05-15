import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { GET_VIDEO } from "../../Constant/constant";
import { FaThumbsUp, FaFolderPlus, FaClock } from "react-icons/fa";
import moment from "moment";
import "./SingleVideo.css";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

const SingleVideo = () => {
  const [videoData, setVideoData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { videoId } = useParams();

  const getVideo = async () => {
    try {
      setLoading(true);
      const {
        data: { video },
        status,
      } = await axios.get(`${GET_VIDEO}${videoId}`);

      if (status === 200) {
        setVideoData(video);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="singleVideo-section">
      {(() => {
        if (loading === true) return <Loader />;
        else if (error) return <Error msg={error} />;
        else
          return (
            <>
              {videoData && (
                <>
                  <iframe
                    className="video-frame"
                    src={`https://www.youtube.com/embed/${videoData._id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="singleVideo-info">
                    <div>
                      <h1 className="singleVideo-title">{videoData.title}</h1>
                      <div className="singleVideo-details">
                        <h4>
                          {videoData.views} Views &nbsp; &nbsp; &nbsp;
                          <span>
                            {moment(videoData.timeStamp).format("Do MMMM YYYY")}
                          </span>
                        </h4>
                        <div className="singleVideo-buttons">
                          <button>
                            <FaThumbsUp />
                            Like
                          </button>
                          <button>
                            <FaFolderPlus />
                            Playlist
                          </button>
                          <button>
                            <FaClock />
                            Watch Later
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="singleVideo-creator-info">
                      <img
                        src={videoData.creatorImg}
                        alt={videoData.creator}
                        className="singleVideo-creator-img avatar "
                      />
                      <h2>{videoData.creator}</h2>
                    </div>
                    <div className="singleVideo-description">
                      {videoData.description}
                    </div>
                  </div>
                </>
              )}
            </>
          );
      })()}
    </div>
  );
};

export default SingleVideo;