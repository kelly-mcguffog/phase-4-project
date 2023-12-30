import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

function EditReview() {
  const { book_id, id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { books, setBooks } = useContext(BookContext);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });

  const findBook = books?.find((book) => book.id === parseInt(book_id));
  const findReview = findBook?.reviews?.find((review) => review.id === parseInt(id));

  useEffect(() => {
    if (findReview && findBook) {
      setFormData({
        comment: findReview.comment,
        rating: findReview.rating,
      });
    }
  }, [findReview, findBook]);

  const { comment, rating } = formData;

  const handleChangeInput = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value
    }));
  };

  const onUpdateReview = (updatedReview) => {
    setUser(() => {
      const updatedReviews = user.reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      );
      return { ...user, reviews: updatedReviews };
    });
  
    const updatedBookReviews = findBook.reviews.map((review) =>
      review.id === updatedReview.id ? updatedReview : review
    );
  
    const updatedBooks = books.map((book) =>
      book.id === updatedReview.book_id ? { ...book, reviews: updatedBookReviews } : book
    );

    setBooks(updatedBooks)
  
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`/books/${book_id}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then((r) => {
    if (r.ok) {
      r.json().then((updatedReview) => onUpdateReview(updatedReview));
      navigate(`/books/${book_id}`);
    } else {
      r.json().then((err) => setErrors(err.errors));
    }
  });
}

  return (
    <div className="form">
      <form onSubmit={handleEditSubmit}>
        <h1 className="form-text">Edit Review</h1>
        {errors.length > 0 && (
          <p className="error-message">
            {errors}
          </p>
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
