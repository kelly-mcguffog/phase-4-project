import React, { useState, useContext } from "react";
// import { UserContext } from "../Context/UserContext";
import { useParams, useHistory} from "react-router-dom";
import { ReviewContext } from "../Context/ReviewContext";
// import EditStarRating from "./EditStarRating";

function EditReview({onUpdateReview}) {
    const {book_id, id} = useParams();
    // const {user} = useContext(UserContext)
    const {reviews} = useContext(ReviewContext)
    const [hover, setHover] = useState(0)
    const history = useHistory()

    const initialState = reviews.find(review => review.id == id)
    const [formData, setFormData] = useState(initialState)
    const {comment, rating} = formData
    
    const handleChangeInput = (e) => {
        setFormData(editFormData => {
           return({ 
                ...editFormData,
                [e.target.name]: e.target.value
            })          
        })
    }


    function handleEditSubmit(e) {
        e.preventDefault();
        fetch(`/books/${book_id}/reviews/${id}`, {
          // fetch(`reviews/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((updatedReview) => onUpdateReview(updatedReview));
          history.push(`/books/${book_id}`);
      }
      return (
            <div>
              <form onSubmit={handleEditSubmit}>
                <h1>Edit Review</h1>
                <textarea
                  type="text"
                  id="comment"
                  autoComplete="off"
                  name="comment"
                  value={comment}
                  onChange={handleChangeInput}
                />
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return(
                            <button
                            type="button"
                            key={index}
                            name="rating"
                            value={index}
                            className={index <= (( hover) || rating) ? "on" : "off"}
                            onClick={(handleChangeInput)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
                <button className="form-button" name="submit" type="submit">Submit</button>
              </form>
            </div>
          );

}


export default EditReview;