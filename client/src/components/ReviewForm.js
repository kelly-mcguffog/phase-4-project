import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams} from "react-router-dom";

function ReviewForm({onAddReview}) {
    const {id} = useParams()
    const {user} = useContext(UserContext)

    const initialState = {
        comment: "",
        rating: "",
        user_id: user.id,
        book_id: id
    }
    const [formData, setFormData] = useState(initialState)
    function handleChange(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });

      }

function handleSubmit(e) {
    e.preventDefault();
    fetch(`/books/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => onAddReview(data))
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
          value={formData.comment}
          onChange={handleChange}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="rating"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <button onChange={(e) => setFormData(e.target.value)} name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;