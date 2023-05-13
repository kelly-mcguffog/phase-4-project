import React from "react";
import ReviewButtons from "./ReviewButtons";

function Review({review, deleteReview}) {

    const {comment, rating, user} = review;

    return(
        <div className="review details">
            <div className="image-cropper">
                <img className="profile-image" src={user.profile_picture}></img>
            </div>
            <div className="details-text">
                <h2 className="comment">{comment}</h2>
                <p className="star">{"★ ".repeat(rating)}</p>
                <h5 className="title"><strong>{user.name}</strong></h5>
                <ReviewButtons deleteReview={deleteReview} review={review}/>
            </div>
        </div>
    )
}

export default Review;