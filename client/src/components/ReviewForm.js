import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams} from "react-router-dom";
import StarRating from "./StarRating";

function ReviewForm({onAddReview}) {
    const {id} = useParams()
    const {user} = useContext(UserContext)
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0)

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
        })
          .then((r) => r.json())
          .then((newReview) => onAddReview(newReview));
      }
      return (
            <div>
              <form onSubmit={handleSubmit}>
                <h1>Reviews</h1>
                <label htmlFor="comment">Comment</label>
                <textarea
                  type="text"
                  id="comment"
                  autoComplete="off"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <label htmlFor="rating">Rating</label>
                <StarRating rating={rating} setRating={setRating} />
                <button name="submit" type="submit">Submit</button>
              </form>
            </div>
          );

}


export default ReviewForm;