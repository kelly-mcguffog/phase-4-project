import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import { ReviewContext } from "../Context/ReviewContext";

function Reviews({book}) {
    // const [reviews, setReviews] = useState([]);
    const {users, reviews} = book;


    const {setReviews} = useContext(ReviewContext)

    function onAddReview(newReview) {
        setReviews([...reviews, newReview]);
      }

    return(
        <>
            <h1>Reviews</h1>
            <ReviewForm onAddReview={onAddReview}/>
            {book.reviews.map(review => {
                return(
                    <div key={review.id}>
                        <h2>{review.comment}</h2>
                        <h5>{review.rating}</h5>
                        <h5>{users.map(u => {
                            if(u.id == review.user_id)
                                return u.name
                        })}</h5>
                    </div>
                )
            })}
        </>
    )
}

export default Reviews;