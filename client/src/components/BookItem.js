import React from "react";
import { Link } from "react-router-dom";

function BookItem({book, isOn, deleteBook}) {
    const {id, title, author, book_image} = book

    const handleDeleteBook = () => {
        fetch(`/books/${id}`, {
            method: 'DELETE'
        })
        .then(id => deleteBook(id))
    }

    return(
        <div className="books">
            <Link className="text" to={`/books/${id}`}>
                <img className="book_image" src={book_image}></img>
                <h3 className="title">{title}</h3>
                <h5 className="author"><em>{author}</em></h5>
            </Link>
            <div className={isOn ? "editMode" : "normalMode"}>
                <Link to={`/books/${id}/edit`}>Edit</Link>
                <button onClick={handleDeleteBook}>Delete</button>
            </div>
        </div>
    )
}

export default BookItem;