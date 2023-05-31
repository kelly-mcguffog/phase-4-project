import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

function ReviewContainer({reviews, onDeleteReview}) {

    const {user,setUser} = useContext(UserContext)
    const {books, setBooks} = useContext(BookContext)
    const ratings = reviews.map(book => book.rating)
    const sum_rating = ratings.reduce((sum, num) => sum + num, 0)
    const totalReviews = reviews.length
    const average_rating = (sum_rating/totalReviews).toFixed(2)
    


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
            <ReviewForm totalReviews={totalReviews} averageRating={average_rating} onAddReview={onAddReview}/>
            {reviews.map(review => (
                <Review key={review.id} review={review} onDeleteReview={onDeleteReview}/>
            ))}
        </div>
    )
}

export default ReviewContainer;