import React, {useState, useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";

function BooksContainer({onDeleteBook}) {
    const {books} = useContext(BookContext)

    const [isOn, setIsOn] = useState(false)

    function handleClick() {
        setIsOn((isOn) => !isOn);
    }

    return(
        <>
        <label className="switch">
            <input onClick={handleClick} type="checkbox"/>
            <span className="slider round"></span>
        </label>
        <div className="main">
            {books.map(book => (
                <BookItem key={book.id} book={book} isOn={isOn} onDeleteBook={onDeleteBook}/>
            ))}
        </div>
        </>
    )
}

export default BooksContainer;