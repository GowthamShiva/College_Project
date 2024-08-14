import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item.id}`} className="link">
      <div className="gigCard">
        {/* Display the cover image */}
        {item.coverImage && (
          <img src={`data:image/jpeg;base64,${item.coverImage}`} alt="Cover" />
        )}
        <div className="info">
          <h2 className="title">{item.title}</h2>
          <div className="user">
            {/* Profile picture, if available */}
            {item.pp && <img src={item.pp} alt="Profile" />}
            <span>{item.username}</span>
          </div>
          <p>{item.shortDescription}</p>
          {/* <div className="star">
            <img src="./img/star.png" alt="Star" />
            <span>{item.star}</span>
          </div> */}
        </div>
        <hr />
        <div className="detail">
          {/* <img src="./img/heart.png" alt="Heart" /> */}
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              {/* <sup>99</sup> */}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
