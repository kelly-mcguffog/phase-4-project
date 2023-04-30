import React, {useEffect, useState, useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";

function BooksContainer() {
    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     fetch("/books")
    //     .then(r => r.json())
    //     .then(book => setBooks(book))
          
    //   }, []);
    const {books} = useContext(BookContext)
    return(
        <main>
            {books.map(book => (
                <BookItem key={book.id} book={book} />
            ))}
        </main>
    )
}

export default BooksContainer;