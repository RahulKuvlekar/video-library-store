import React from "react";
import "./VideoFilters.css";
import { useVideoContext } from "../../Hooks/useVideoContext";
import { videoFeatures } from "../../Constant/constant";

const VideoFilters = () => {
  const {
    videoState: { categoryList, category },
    dispatchVideo,
  } = useVideoContext();

  const { SORT_BY_CATEGORY } = videoFeatures;

  const setCategory = (name) => {
    dispatchVideo({
      type: SORT_BY_CATEGORY,
      payload: name,
    });
  };

  return (
    <ul className="videoFilters-section">
      <li
        className={`videoFilters-list ${
          category?.toLowerCase() === "All"?.toLowerCase()
            ? "filter-active"
            : ""
        }`}
        onClick={() => setCategory("All")}
      >
        All
      </li>
      {categoryList?.length > 0 &&
        categoryList?.map(({ _id, categoryName }) => (
          <li
            className={`videoFilters-list ${
              category?.toLowerCase() === categoryName?.toLowerCase()
                ? "filter-active"
                : ""
            }`}
            key={`VideoFilter-${_id}`}
            onClick={() => setCategory(categoryName)}
          >
            {categoryName}
          </li>
        ))}
    </ul>
  );
};

export default VideoFilters;
