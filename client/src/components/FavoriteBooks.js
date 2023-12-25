import React from "react";
import { Link} from "react-router-dom";

const FavoriteBooks = ({ name, topReviews }) => (
    <div>
      <h2 className="page-header">{name}'s Favorite Books</h2>
      <div className="favorites">
        {topReviews.map((review) => (
          <div className="books favorite-books" key={review.id}>
            <Link to={`/books/${review.book_id}`}>
              <img className="image" src={review.book.book_image} alt={review.book.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default FavoriteBooks;