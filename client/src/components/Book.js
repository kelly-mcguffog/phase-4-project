import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const { title, author, genre, summary, page_count } = book;

  return (
    <article>
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
    </article>
  );
}

export default Book;
