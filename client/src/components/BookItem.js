import React from "react";

function BookItem({book}) {
    const {id, title, genre, author, summary, book_image, page_count} = book
    return(
        <>
            <img src={book_image}></img>
            <h3>{title}</h3>
            <h5>{author}</h5>
        </>
    )
}

export default BookItem;