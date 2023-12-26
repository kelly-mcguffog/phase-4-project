import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

function EditReview() {
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });

  const { book_id, id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { books, setBooks } = useContext(BookContext);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`/books/${book_id}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [book_id, id]);

  const { comment, rating } = formData;

  const handleChangeInput = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateArrayObject = (array, objectId, updatedObject) =>
    array.map((item) => (item.id === objectId ? updatedObject : item));

  const onUpdateReview = () => {
    const book = books.find((book) => book.id === parseInt(book_id));
    const bookReviews = updateArrayObject(
      book.reviews,
      formData.id,
      formData
    );

    const updatedBook = { ...book, reviews: bookReviews };
    const updatedBookList = updateArrayObject(
      books,
      formData.book_id,
      updatedBook
    );

    setBooks(updatedBookList);

    const updateUserReview = updateArrayObject(
      user.reviews,
      formData.id,
      formData
    );
    setUser({ ...user, reviews: updateUserReview });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`/books/${book_id}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then(onUpdateReview);
        history.push(`/books/${book_id}`);
      } else {
        r.json().then(handleErrors);
      }
    });
  };

  const handleErrors = (err) => {
    setErrors(err.errors);
  };

  return (
    <div className="form">
      <form onSubmit={handleEditSubmit}>
        <h1 className="form-text">Edit Review</h1>
        {errors.length > 0 && (
          <ul className="error-message">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <textarea
          type="text"
          id="comment"
          autoComplete="off"
          name="comment"
          value={comment}
          onChange={handleChangeInput}
        />
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                name="rating"
                value={index}
                className={index <= hover || index <= rating ? "on" : "off"}
                onClick={handleChangeInput}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}

        </div>
        <button className="form-button" name="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditReview;