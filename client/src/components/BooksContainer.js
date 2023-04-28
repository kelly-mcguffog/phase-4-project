import React, {useEffect, useState} from "react";
import BookItem from "./BookItem";

function BooksContainer() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("/books")
        .then(r => r.json())
        .then(book => setBooks(book))
          
      }, []);
    return(
        <main>
            {books.map(book => (
                <BookItem key={book.id} book={book} />
            ))}
        </main>
    )
}

export default BooksContainer;