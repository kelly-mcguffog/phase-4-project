import React from "react";
import { Link } from "react-router-dom";

const BookDetailsContent = ({ title, author, genre, summary, page_count, book_image, id }) => (
  <div className="details">
    <img className="details-image" src={book_image} alt={title} />
    <div className="details-text">
      <h1>{title}</h1>
      <small>
        <p>
          {genre} • {page_count} pages
        </p>
        <p>
          <em>Written by {author}</em>
        </p>
      </small>
      <p>{summary}</p>
      <div>
        <Link to={`/books/${id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Link>
      </div>
    </div>
  </div>
);

export default BookDetailsContent;