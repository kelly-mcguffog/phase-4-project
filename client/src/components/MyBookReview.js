import React from "react";
import { Link} from "react-router-dom";
import ReviewButtons from "./ReviewButtons";

function MyBookReview ({ review, onDeleteReview }){

    const {id, book_id, book, comment, rating} = review;
    const {book_image, title, author} = book;

    return(
    <div className="review details" key={id}>
      <Link to={`/books/${book_id}`}>
        <img className="review-image" src={book_image} alt={title} />
      </Link>
      <div className="details-text">
        <h3 className="comment">{comment}</h3>
        <p className="star">{"★".repeat(rating)}</p>
        <h5 className="title">
          <strong>{title}</strong>
        </h5>
        <h5 className="author">
          <em>{author}</em>
        </h5>
      </div>
      <div className="review-menu">
                <ReviewButtons onDeleteReview={onDeleteReview} review={review}/>
            </div>
    </div>
    )
}
  export default MyBookReview;