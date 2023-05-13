import React from "react";
import ReviewButtons from "./ReviewButtons";

function Review({review, users, deleteReview}) {

    const {comment, rating, user_id} = review;

    return(
        <div className="review">
            <h2>{comment}</h2>
            <span className="star">{"★".repeat(rating)}</span>
            <h5>{users.map(u => {
                if(u.id === user_id)
                    return u.name
            })}</h5>
            <ReviewButtons deleteReview={deleteReview} review={review}/>
        </div>
    )
}

export default Review;