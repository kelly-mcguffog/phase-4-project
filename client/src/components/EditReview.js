import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams} from "react-router-dom";
// import { ReviewContext } from "../Context/ReviewContext";
import EditStarRating from "./EditStarRating";

function EditReview() {
    const {id} = useParams();
    const {user} = useContext(UserContext)

    const initialState = user.reviews.find(r => r.id == id)
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
        fetch(`/reviews/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((updatedReview) => console.log(updatedReview));
      }
      return (
            <div>
              <form onSubmit={handleEditSubmit}>
                <h1>Reviews</h1>
                <label htmlFor="comment">Comment</label>
                <textarea
                  type="text"
                  id="comment"
                  autoComplete="off"
                  name="comment"
                  value={comment}
                  onChange={handleChangeInput}
                />
                <label htmlFor="rating">Rating</label>
                <EditStarRating handleChangeInput={handleChangeInput} rating={rating}/>
                <button name="submit" type="submit">Submit</button>
              </form>
            </div>
          );

}


export default EditReview;