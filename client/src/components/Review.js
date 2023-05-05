import React from "react";
// import { ReviewContext } from "../Context/ReviewContext";
import { Link } from "react-router-dom";

function Review({review, deleteReview, users}) {
    // const {users, reviews} = book;
    // const {setReviews} = useContext(ReviewContext)
    console.log(users)

    const {id, comment, rating, book_id, user_id} = review;

    const handleDeleteReview = () => {
        fetch(`/books/${book_id}/reviews/${id}`, {
            method: 'DELETE'
        })
        .then(id => deleteReview(id))
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
            <Link className="form-button" to={`/books/${book_id}/reviews/${id}`}>Edit</Link>
        </div>
    )
}

export default Review;