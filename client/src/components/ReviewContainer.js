import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { ReviewContext } from "../Context/ReviewContext";
// import { Link } from "react-router-dom";

function ReviewContainer({book}) {
    const {users, reviews} = book;
    const {setReviews} = useContext(ReviewContext)


      const ratings = reviews.map((ratings) => ratings.rating)
      const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    function onAddReview(newReview) {
        setReviews([...reviews, newReview]);
    }

    function deleteReview(id) {
        const updatedReviews = reviews.filter(review => review.id !== id)
        setReviews(updatedReviews)
    }



    return(
        <div>
            <h1>Reviews</h1>
            <small>
                <p>{book.reviews.length} reviews • {averageRating} rating</p>
            </small>
            <ReviewForm onAddReview={onAddReview}/>
            {book.reviews.map(review => (
                <Review key={review.id} review={review} deleteReview={deleteReview} users={users}/>
            ))}
        </div>
    )
}

export default ReviewContainer;