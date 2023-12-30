import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function ReviewButtons({ review, onDeleteReview }) {

  const { user } = useContext(UserContext)
  const { id, book_id, user_id } = review;
  const [isShowing, setIsShowing] = useState(false)

  const handleDeleteReview = () => {
    fetch(`/books/${book_id}/reviews/${id}`, {
      method: 'DELETE'
    })
    onDeleteReview(review)
  }

  const handleDropdown = () => {
    setIsShowing(isShowing => !isShowing)
  }

  if (user.id === user_id) {
    return (
      <div className="dropdown">
        <h2 className="dropbtn"><i onClick={handleDropdown} className="fa-solid fa-bars"></i></h2>
        <div className={isShowing ? "dropdown-content visible" : "dropdown-content hidden"}>
          <Link to={`/books/${book_id}/reviews/${id}/edit`}>Edit</Link>
          <hr></hr>
          <h3 onClick={handleDeleteReview} className="delete-btn">Delete</h3>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default ReviewButtons;