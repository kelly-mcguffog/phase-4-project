import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import { useParams, useHistory } from "react-router-dom";

function EditBookForm() {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    summary: '',
    page_count: '',
    book_image: ''
  })

  const { id } = useParams();
  const { user, setUser } = useContext(UserContext)
  const { books, setBooks } = useContext(BookContext)
  const [errors, setErrors] = useState([])
  const history = useHistory();

  useEffect(() => {
    fetch(`/books/${id}`)
      .then(res => res.json())
      .then(setFormData)
  }, [id])

  const { title, author, genre, summary, page_count, book_image } = formData


  const onUpdateBook = (updatedBook) => {
    const updatedList = books.map(book => {
      if (book.id === updatedBook.id) {
        return updatedBook
      } else {
        return book
      }
    })
    setBooks(updatedList)

    const updatedUserBookList = user.reviews.map(review => {
      if (review.book_id === updatedBook.id) {
        return { ...review, book: updatedBook }
      } else {
        return { ...review, book: review.book }
      }
    })
    setUser({ ...user, reviews: updatedUserBookList })
  }

  const handleChangeInput = (e) => {
    setFormData(formData => {
      return ({
        ...formData,
        [e.target.name]: e.target.value
      })
    })
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    fetch(`/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedBook) => onUpdateBook(updatedBook))
        history.push(`/books/${id}`)
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return (
    <div className="form">
      <form onSubmit={handleEditSubmit}>
        <h1>Edit Book Details</h1>
        {errors.length > 0 && (
          <ul className="error-message">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <input
          type="text"
          name="title"
          onChange={handleChangeInput}
          value={title}
          className="form-input"
          autoComplete="off"
        />
        <input
          type="text"
          name="author"
          onChange={handleChangeInput}
          value={author}
          className="form-input"
          autoComplete="off"
        />
        <select className="form-input" name="genre" value={genre} onChange={handleChangeInput}>
          <option value="Action & Adventure">Action & Adventure</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Short Story">Short Story</option>
          <option value="Memoir">Memoir</option>
          <option value="Children">Children</option>
        </select>
        <textarea
          name="summary"
          onChange={handleChangeInput}
          value={summary}
          className="form-textarea"
          autoComplete="off"
        >
        </textarea>
        <input
          type="text"
          name="page_count"
          onChange={handleChangeInput}
          value={page_count}
          className="form-input"
          autoComplete="off"
        />
        <input
          type="text"
          name="book_image"
          onChange={handleChangeInput}
          value={book_image}
          autoComplete="off"
          className="form-input"
        />
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}


export default EditBookForm;