import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";

function Gig() {
  const { id } = useParams(); // Retrieve the id from the URL
  const [gig, setGig] = useState(null); // State to store gig data
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [newReview, setNewReview] = useState(""); // State to store the new review text
  const [rating, setRating] = useState(0); // State to store the new review rating

  useEffect(() => {
    // Fetch gig data based on id
    const fetchGig = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/services/gigs/${id}`); // Replace with your API endpoint
        setGig(response.data);
        setReviews(response.data.reviews || []); // Assuming reviews are part of the gig data
      } catch (error) {
        console.error("Error fetching gig data:", error);
      }
    };

    fetchGig();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!newReview || rating === 0) return;

    try {
      const response = await axios.post(`http://localhost:8080/api/reviews`, {
        gigId: id,
        review: newReview,
        rating: rating,
        username: "John Doe", // Replace with actual username from authentication
      });

      setReviews([...reviews, response.data]); // Update the reviews list with the new review
      setNewReview(""); // Clear the input field
      setRating(0); // Reset the rating
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!gig) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">{gig.category}</span>
          <h1>{gig.title}</h1>
          {/* Subcategory name displayed under the title */}
          <h3 className="subcategory">{gig.subcategory}</h3>
          <div className="user">
            <img
              className="pp"
              src={`data:image/jpeg;base64,${gig.coverImage}`}
              alt={gig.username}
            />
            <span>{gig.username}</span>
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            {/* Display coverImage and additionalImage */}
            <img src={`data:image/jpeg;base64,${gig.coverImage}`} alt="Cover" />
            <img src={`data:image/jpeg;base64,${gig.additionalImage}`} alt="Additional" />
          </Slider>
          <h2>About This Service</h2>
          <p>{gig.description}</p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={`data:image/jpeg;base64,${gig.coverImage}`}
                alt={gig.username}
              />
              <div className="info">
                <span>{gig.username}</span>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Location</span>
                  <span className="desc">{gig.location}</span>
                </div>
              </div>
              <hr />
              <p>{gig.shortDescription}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{gig.serviceTitle}</h3>
            <h2>${gig.price}</h2>
          </div>
          <p>{gig.shortDescription}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{gig.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{gig.revisionNumber} Revisions</span>
            </div>
          </div>
          {/* Add features if there are any */}
          {gig.features && (
            <div className="features">
              {gig.features.map((feature, index) => (
                <div key={index} className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
          <button>Continue</button>
          
          {/* Review Submission Box
          <div className="review-box">
            <h3>Leave a Review</h3>
            <div className="rating">
              {[...Array(5)].map((star, index) => (
                <img
                  key={index}
                  src={rating > index ? "/img/star-filled.png" : "/img/star-empty.png"}
                  alt="star"
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <textarea
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div> */}
        </div>
      </div>
      {/* Display Reviews
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="item">
            <div className="user">
              <img
                className="pp"
                src="/img/default-user.png" // Replace with user's profile picture if available
                alt="User"
              />
              <span>{review.username}</span>
              <div className="stars">
                {[...Array(review.rating)].map((star, i) => (
                  <img key={i} src="/img/star-filled.png" alt="star" />
                ))}
                {[...Array(5 - review.rating)].map((star, i) => (
                  <img key={i} src="/img/star-empty.png" alt="star" />
                ))}
              </div>
            </div>
            <p>{review.review}</p>
            <hr />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Gig;
