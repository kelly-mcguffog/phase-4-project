import React, {useContext, useEffect} from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

function ReviewContainer({book, onAddReview, deleteReview}) {
    const {users, reviews} = book;

    const ratings = reviews.map((ratings) => ratings.rating)
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const totalReviews = book.reviews.length

    return(
        <div>

            <ReviewForm totalReviews={totalReviews} averageRating={averageRating} onAddReview={onAddReview}/>
            {book.reviews.map(review => (
                <Review key={review.id} review={review} users={users} deleteReview={deleteReview}/>
            ))}
        </div>
    )
}

export default ReviewContainer;