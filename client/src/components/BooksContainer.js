import React, {useState, useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";

function BooksContainer() {
    const {books, setBooks} = useContext(BookContext)

    const [isOn, setIsOn] = useState(false)

    function handleClick() {
        setIsOn((isOn) => !isOn);
    }

    function deleteBook(id) {
        const updatedBooks = books.filter(book => book.id !== id)
        setBooks(updatedBooks)
    }

    return(
        <>
        <label className="switch">
            <input onClick={handleClick} type="checkbox"/>
            <span className="slider round"></span>
        </label>
        <div className="main">
            {books.map(book => (
                <BookItem key={book.id} book={book} isOn={isOn} deleteBook={deleteBook}/>
            ))}
        </div>
        </>
    )
}

export default BooksContainer;