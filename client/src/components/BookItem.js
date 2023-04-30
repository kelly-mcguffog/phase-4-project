import React from "react";
import { Link } from "react-router-dom";

function BookItem({book}) {
    const {id, title, genre, author, summary, book_image, page_count} = book
    return(
        <div className="books">
            <Link className="text" to={`/books/${id}`}>
                <img className="book_image" src={book_image}></img>
                <h3 className="title">{title}</h3>
                <h5 className="author"><em>{author}</em></h5>
            </Link>
        </div>
    )
}

export default BookItem;