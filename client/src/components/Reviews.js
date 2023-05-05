import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import { ReviewContext } from "../Context/ReviewContext";
import { Link } from "react-router-dom";

function Reviews({book}) {
    const {users, reviews} = book;
    const {setReviews} = useContext(ReviewContext)

    function onAddReview(newReview) {
        setReviews([...reviews, newReview]);
      }

      const ratings = reviews.map((ratings) => ratings.rating)
      const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    return(
        <div>
            <h1>Reviews</h1>
            <small>
                <p>{book.reviews.length} reviews • {averageRating} rating</p>
            </small>
            <ReviewForm onAddReview={onAddReview}/>
                {book.reviews.map(review => {
                return(
                    <div className="review" key={review.id}>
                        <h2>{review.comment}</h2>
                        <span className="star">{"★".repeat(review.rating)}</span>
                        <h5>{users.map(u => {
                            if(u.id === review.user_id)
                                return u.name
                        })}</h5>
                        <button>Delete</button>
                        <Link to={`/reviews/${review.id}`}>Edit</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews;