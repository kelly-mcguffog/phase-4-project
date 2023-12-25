import React, { useContext } from "react";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

function ReviewContainer({ reviews, onDeleteReview }) {
  const { user, setUser } = useContext(UserContext);
  const { books, setBooks } = useContext(BookContext);

  const calculateAverageRating = () => {
    const ratings = reviews.map((review) => review.rating);
    const sumRating = ratings.reduce((sum, num) => sum + num, 0);
    const totalReviews = reviews.length;
    return (sumRating / totalReviews).toFixed(2);
  };

  const onAddReview = (newReview) => {
    const updatedBooks = books.map((book) =>
      book.id === newReview.book_id
        ? { ...book, reviews: [...book.reviews, newReview] }
        : book
    );

    if (newReview.user_id === user.id) {
      setUser({ ...user, reviews: [...user.reviews, newReview] });
    }

    setBooks(updatedBooks);
  };

  const averageRating = calculateAverageRating();

  return (
    <>
      <ReviewForm totalReviews={reviews.length} averageRating={averageRating} onAddReview={onAddReview} />
      {reviews.map((review) => (
        <Review key={review.id} review={review} onDeleteReview={onDeleteReview} />
      ))}
    </>
  );
}

export default ReviewContainer;