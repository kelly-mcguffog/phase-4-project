import React from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

function ReviewContainer({book, onAddReview, deleteReview}) {
    const {reviews} = book;

    const ratings = reviews.map((ratings) => ratings.rating)
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    const totalReviews = reviews.length

    return(
        <div>

            <ReviewForm totalReviews={totalReviews} averageRating={averageRating} onAddReview={onAddReview}/>
            {reviews.map(review => (
                <Review key={review.id} review={review} deleteReview={deleteReview}/>
            ))}
        </div>
    )
}

export default ReviewContainer;