import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ReviewProvider } from "../Context/ReviewContext";
import ReviewContainer from "./ReviewContainer";

const initialState = {
  book: null,
  error: null,
  status: "pending",
};

function Book() {
  const [{ book, error, status }, setState] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    setState(initialState);
    fetch(`/books/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((book) =>
          setState({ book, error: null, status: "resolved" })
        );
      } else {
        r.json().then((message) =>
          setState({ book: null, error: message.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;

  if (status === "rejected") {
    if (error === "Maximum pageview limit reached") {
      return <h1>Hi</h1>
    } else {
      return <h1>{error}</h1>;
    }
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
                  {/* <button className="delete-book" onClick={handleDeleteBook}><img className="delete icon" src="https://cdn4.iconfinder.com/data/icons/hodgepodge-vol-1/32/circle_x_delete_cross-512.png"/></button> */}
                </div>
            </div>
        </div>
        <div id="review-section">
            <ReviewProvider>
                <ReviewContainer book={book}/>
            </ReviewProvider>
        </div>
    </article>
  );
}

export default Book;
