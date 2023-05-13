import { useContext, useState} from "react";
import { useParams, Link } from "react-router-dom";
import ReviewContainer from "./ReviewContainer";
import { BookContext } from "../Context/BookContext"; 


function Book({onAddReview, deleteReview}) {
  const { id } = useParams();
  const {books} = useContext(BookContext)

const book = books.find(book => book.id == id)

if(!book){
  return <h1>loading</h1>
}


const { title, author, genre, summary, page_count, book_image } = book;



  return (
    <article>
        <div className="details">
            <img className="details-image" src={book_image}></img>
            <div className="details-text">
                <h1>{title}</h1>
                <small>
                    <p>
                    {genre} • {page_count} pages
                    </p>
                    <p>
                    <em>Written by {author}</em>
                    </p>
                </small>
                <p>{summary}</p>
                <div>
                  <Link to={`/books/${id}/edit`}><img className="edit icon" src="https://cdn.onlinewebfonts.com/svg/img_420068.png"/></Link>
                </div>
            </div>
        </div>
        <div className="review-section">
          <ReviewContainer book={book} onAddReview={onAddReview} deleteReview={deleteReview}/>

        </div>
    </article>
  );
}

export default Book;
