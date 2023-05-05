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
            <div className={isOn ? "editMode" : "normalMode"}>
                {/* <Link to={`/books/${id}/edit`}><img className="edit icon" src="https://cdn.onlinewebfonts.com/svg/img_420068.png"/></Link> */}
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