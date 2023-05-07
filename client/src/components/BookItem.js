import React from "react";
import { Link } from "react-router-dom";

function BookItem({book, isOn, onDeleteBook}) {
    const {id, title, author, book_image} = book

    const handleDeleteBook = () => {
        fetch(`/books/${id}`, {
            method: 'DELETE'
        })
        onDeleteBook(book)
    }


    return(
        <div className="books">
            <div className={isOn ? "editMode" : "normalMode"}>
                <button className="delete-book" onClick={handleDeleteBook}><img className="delete icon" src="https://cdn4.iconfinder.com/data/icons/hodgepodge-vol-1/32/circle_x_delete_cross-512.png"/></button>
            </div>
            <Link className="text" to={`/books/${id}`}>
                <img className="book_image" src={book_image}></img>
                <h3 className="title">{title}</h3>
                <h5 className="author"><em>{author}</em></h5>
            </Link>
        </div>
    )
}

export default BookItem;