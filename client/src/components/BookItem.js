import React from "react";
import { Link } from "react-router-dom";

function BookItem({book}) {
    const {id, title, genre, author, summary, book_image, page_count} = book
    return(
        <Link to={`/books/${id}`}>
            <img src={book_image}></img>
            <h3>{title}</h3>
            <h5>{author}</h5>
        </Link>
    )
}

export default BookItem;