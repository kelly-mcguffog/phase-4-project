import { useContext} from "react";
import { useParams } from "react-router-dom";
import ReviewContainer from "./ReviewContainer";
import { BookContext } from "../Context/BookContext"; 
import BookDetailsContent from "./BookDetailsContent";


function BookDetails({onDeleteReview}) {
  const { id } = useParams();
  const { books } = useContext(BookContext);

  const book = books.find((book) => book.id === parseInt(id));
  if (!book) {
    return <h1>Not Found</h1>;
  }

  const { title, author, genre, summary, page_count, book_image, reviews } = book;

  return (
    <article>
      <BookDetailsContent
        title={title}
        author={author}
        genre={genre}
        summary={summary}
        page_count={page_count}
        book_image={book_image}
        id={id}
      />
      <div className="review-section">
        <ReviewContainer reviews={reviews} onDeleteReview={onDeleteReview} />
      </div>
    </article>
  );
}

export default BookDetails;
