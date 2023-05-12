import React from "react";
import { Link } from "react-router-dom";

function Review({review, users, deleteReview}) {

    const {id, comment, rating, book_id, user_id} = review;

    const handleDeleteReview = () => {
            fetch(`/reviews/${id}`, {
            method: 'DELETE'
        })
        deleteReview(review)
    }

    // console.log(review)
    // console.log(users)
    return(
        <div className="review">
            <h2>{comment}</h2>
            <span className="star">{"★".repeat(rating)}</span>
            <h5>{users.map(u => {
                if(u.id === user_id)
                    return u.name
            })}</h5>
            <button className="form-button" onClick={handleDeleteReview}>Delete</button>
            <Link className="form-button" to={`/books/${book_id}/reviews/${id}/edit`}>Edit</Link>
        </div>
    )
}

export default Review;