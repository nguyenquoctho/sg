import React from 'react'
import { BASE_URL } from "../../setting";
const NextArrow=(props)=> {
    const { className, style, onClick } = props;
    return (
      <div
        className={className + " next-arrow-detail"}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="detail-arrow-content rounded">
          <img
            className="next-arrow-icon"
            // src={BASE_URL + "/images/right-arrow-black.png"}
            src={BASE_URL + "/images/right-arrow-black.png"}
          />
        </div>
      </div>
    );
}

export default NextArrow
