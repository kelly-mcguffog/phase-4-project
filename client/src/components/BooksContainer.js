import React, {useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";

function BooksContainer() {
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