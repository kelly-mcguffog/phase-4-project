import { useContext} from "react";
import { useParams, Link } from "react-router-dom";
import ReviewContainer from "./ReviewContainer";
import { BookContext } from "../Context/BookContext"; 


function Book({onDeleteReview}) {
  const { id } = useParams();
  const {books} = useContext(BookContext)

  const book = books.find(book => book.id === parseInt(id))
  if(!book){
    return <h1>Not Found</h1>
  }

  const { title, author, genre, summary, page_count, book_image, reviews } = book;

  return (
    <article>
        <div className="details">
            <img className="details-image" src={book_image} alt={title}></img>
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
                  <Link to={`/books/${id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Link>
                </div>
            </div>
        </div>
        <div className="review-section">
          <ReviewContainer reviews={reviews} onDeleteReview={onDeleteReview}/>
        </div>
    </article>
  );
}

export default Book;
