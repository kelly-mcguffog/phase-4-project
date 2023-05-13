import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function ReviewButtons({review, deleteReview}) {

    const {user} = useContext(UserContext)
    const {id, book_id, user_id} = review;


    const handleDeleteReview = () => {
        fetch(`/reviews/${id}`, {
        method: 'DELETE'
    })
    deleteReview(review)
}

if (user.id === user_id) {
    return(
      <>
          <button className="form-button" onClick={handleDeleteReview}>Delete</button>
          <Link className="form-button" to={`/books/${book_id}/reviews/${id}/edit`}>Edit</Link>
      </>
    )
  } else {
    return (
      <small></small>
    )
  }
}

export default ReviewButtons;