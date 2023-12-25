import React from "react";
import { Link} from "react-router-dom";
import ReviewButtons from "./ReviewButtons";

const BookReview = ({ review, onDeleteReview }) => (
    <div className="review details" key={review.id}>
      <Link to={`/books/${review.book_id}`}>
        <img className="review-image" src={review.book.book_image} alt={review.book.title} />
      </Link>
      <div className="details-text">
        <h2 className="comment">{review.comment}</h2>
        <p className="star">{"★".repeat(review.rating)}</p>
        <h5 className="title">
          <strong>{review.book.title}</strong>
        </h5>
        <h5 className="author">
          <em>{review.book.author}</em>
        </h5>
        <ReviewButtons onDeleteReview={onDeleteReview} review={review} />
      </div>
    </div>
  );
  
  export default BookReview;