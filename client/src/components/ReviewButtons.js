import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function ReviewButtons({review, onDeleteReview}) {

  const {user} = useContext(UserContext)
  const {id, book_id, user_id} = review;

  const handleDeleteReview = () => {
    fetch(`/books/${book_id}/reviews/${id}`, {
      method: 'DELETE'
    })
    onDeleteReview(review)
  }

  if (user.id === user_id) {
    return(
      <div className="profile-buttons">
          <button className="form-button" onClick={handleDeleteReview}>Delete</button>
          <Link className="form-button" to={`/books/${book_id}/reviews/${id}/edit`}>Edit</Link>
      </div>
    )
  } else {
    return (
      <small></small>
    )
  }
}

export default ReviewButtons;