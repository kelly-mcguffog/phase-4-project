import React, {useContext} from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
// import { ReviewContext } from "../Context/ReviewContext";
// import { BookContext } from "../Context/BookContext";

function ReviewContainer({book, onAddReview, deleteReview}) {
    const {users, reviews} = book;
    // const {setReviews} = useContext(ReviewContext)
    // const {books, setBooks} = useContext(BookContext)

    const ratings = reviews.map((ratings) => ratings.rating)
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const totalReviews = book.reviews.length

    // function onAddReview(newReview) {
    //     const updatedBooks = books.map(book => {
    //         if(book.id === newReview.book_id){
    //             return {...book, reviews: [...book.reviews, newReview]}
    //         }else{
    //             return book
    //         }
    //     })
    //     setBooks(updatedBooks)
    //     setReviews([...reviews, newReview]);
    // }

    // function deleteReview(selectedReview) {
    //     const updatedReviews = reviews.filter(review => review.id !== selectedReview.id)
    //     const updatedBooks = books.map(book => {
    //       const match = [...book.reviews].filter(review => review.id !== selectedReview.id)
    //       if(book.id === selectedReview.book_id){
    //         return {...book, reviews: match}
    //       }else{
    //         return book
    //       }      
    //     })
    //     setBooks(updatedBooks)
    //     setReviews(updatedReviews)
    // }


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