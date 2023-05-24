import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

function ReviewContainer({reviews, onDeleteReview}) {

    const {user,setUser} = useContext(UserContext)
    const {books, setBooks} = useContext(BookContext)
    const ratings = reviews.map((ratings) => ratings.rating)
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    const totalReviews = reviews.length

    function onAddReview(newReview) {
        const updatedBooks = books.map(book => {
          if(book.id === newReview.book_id){
            return {...book, reviews: [...book.reviews, newReview]}
          }else{
            return book
          }
        })
        
        if(newReview.user_id === user.id){
          setUser({...user, reviews: [...user.reviews, newReview]})
        }else{
          return user
        }
        setBooks(updatedBooks)
    }
    
    return(
        <div>
            <ReviewForm totalReviews={totalReviews} averageRating={averageRating} onAddReview={onAddReview}/>
            {reviews.map(review => (
                <Review key={review.id} review={review} onDeleteReview={onDeleteReview}/>
            ))}
        </div>
    )
}

export default ReviewContainer;