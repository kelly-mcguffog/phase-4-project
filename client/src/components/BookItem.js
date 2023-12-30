import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import { Link } from "react-router-dom";

function BookItem({ book, isOn }) {

    const { user, setUser } = useContext(UserContext)
    const { books, setBooks } = useContext(BookContext)
    const { id, title, author, book_image } = book

    const onDeleteBook = (selectedBook) => {
        const updatedBooks = books.filter(book => book.id !== selectedBook.id)
        setBooks(updatedBooks)

        const updatedUserBooks = user.reviews.filter(review => review.book_id !== selectedBook.id)
        setUser({ ...user, reviews: updatedUserBooks })
    }

    const handleDeleteBook = () => {
        fetch(`/books/${id}`, {
            method: 'DELETE'
        })
        onDeleteBook(book)
    }

    return (
        <div className="books">
            <div className={isOn ? "editMode" : "normalMode"}>
                <button className="delete-book" onClick={handleDeleteBook}><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
            <Link className="text" to={`/books/${id}`}>
                <img className="image" src={book_image} alt={title}></img>
                <h3 className="title">{title}</h3>
                <h5 className="author"><em>{author}</em></h5>
            </Link>
        </div>
    )
}

export default BookItem;