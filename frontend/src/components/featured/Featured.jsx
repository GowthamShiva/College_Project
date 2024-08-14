import React from "react";
import "./Featured.scss";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          {/* <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "building mobil app"' />
            </div>
            <button className="butti">Search</button>
          </div> */}
          <div className="popular">
            <span>Popular:</span>
            <Link to={"/gigs"}><button>Web Design</button></Link>
            {/* <button>WordPress</button> */}
            <Link to={"/gigs"}><button>Logo Design</button></Link>
            <Link to={"/gigs"}><button>AI Services</button></Link>
          </div>
        </div>
        <div className="right">
          <img src="./img/man1.gif" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
