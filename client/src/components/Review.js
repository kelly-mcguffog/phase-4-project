import React from "react";
import { Link } from "react-router-dom";

function Review({review, users, deleteReview}) {

    const {id, comment, rating, book_id, user_id} = review;

    const handleDeleteReview = () => {
        // fetch(`/books/${book_id}/reviews/${id}`, {
            fetch(`/reviews/${id}`, {
            method: 'DELETE'
        })
        // .then(id => deleteReview(id))
        deleteReview(review)
    }

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