import React from "react";
import ReviewButtons from "./ReviewButtons";

function Review({review, onDeleteReview}) {

    const {comment, rating, user} = review;
    const {name, profile_picture} = user;

    return(
        <div className="review details">
            <div className="image-cropper">
                <img className="profile-image" src={profile_picture} alt={name}></img>
            </div>
            <div className="details-text">
                <h3 className="comment">{comment}</h3>
                <p className="star">{"★ ".repeat(rating)}</p>
                <h5 className="title"><strong>{name}</strong></h5>
                <ReviewButtons onDeleteReview={onDeleteReview} review={review}/>
            </div>
        </div>
    )
}

export default Review;