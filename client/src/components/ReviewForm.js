import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams} from "react-router-dom";
import StarRating from "./StarRating";

function ReviewForm({totalReviews, averageRating, onAddReview}) {
  const {id} = useParams()
  const {user} = useContext(UserContext)
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState([])
    

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/books/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        rating: rating,
        user_id: user.id,
        book_id: id
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newReview) => onAddReview(newReview));
        setComment("")
        setRating(0)
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  
  return (
    <div>
      <form className="review-form" onSubmit={handleSubmit}>
        <h1>Reviews</h1>
        <small>
          <p>{totalReviews} reviews • {averageRating} <small className="star small-star">&#9733;</small></p>
        </small>
        <p className="error-message">{errors}</p>
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
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;