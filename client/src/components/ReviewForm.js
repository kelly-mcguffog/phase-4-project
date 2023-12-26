import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";

function ReviewForm({ totalReviews, averageRating, onAddReview }) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);

  const resetFormState = () => {
    setComment("");
    setRating(0);
  };

  const handleFormSubmit = (newReview) => {
    fetch(`/books/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        rating: rating,
        user_id: user.id,
        book_id: id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newReview) => {
          onAddReview(newReview);
          resetFormState();
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="form-text">Reviews</h1>
        <small>
          <p>
            {totalReviews} reviews • {averageRating}{" "}
            <small className="star small-star">&#9733;</small>
          </p>
        </small>
        {errors.length > 0 && (
          <p className="error-message">
            {errors}
          </p>
        )}
        <textarea
          type="text"
          id="comment"
          autoComplete="off"
          name="comment"
          value={comment}
          placeholder="Leave a review"
          onChange={(e) => setComment(e.target.value)}
        />
        <StarRating rating={rating} setRating={setRating} />
        <button className="form-button" name="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;