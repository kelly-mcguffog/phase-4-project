// import { useEffect, useState } from "react";
import { useContext} from "react";
import { useParams, Link } from "react-router-dom";
import ReviewContainer from "./ReviewContainer";
import { BookContext } from "../Context/BookContext"; 

// const initialState = {
//   book: null,
//   error: null,
//   status: "pending",
// };

function Book({onAddReview, deleteReview}) {
  // const [{ book, error, status }, setState] = useState(initialState);
  const { id } = useParams();
  const {books} = useContext(BookContext)

const book = books.find(book => book.id == id)

  // useEffect(() => {
  //   setState(initialState);
  //   fetch(`/books/${id}`).then((r) => {
  //     if (r.ok) {
  //       r.json().then((book) =>
  //         setState({ book, error: null, status: "resolved" })
  //       );
  //     } else {
  //       r.json().then((message) =>
  //         setState({ book: null, error: message.error, status: "rejected" })
  //       );
  //     }
  //   });
  // }, [id]);

  // if (status === "pending") return <h1>Loading...</h1>;

  // if (status === "rejected") {
  //     return <h1>{error}</h1>;
  // }

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
        <div id="review-section">
          <ReviewContainer book={book} onAddReview={onAddReview} deleteReview={deleteReview}/>
        </div>
    </article>
  );
}

export default Book;
