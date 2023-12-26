import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useHistory } from "react-router-dom";

function AddBookForm() {

  const initialState = {
    title: "",
    author: "",
    genre: "",
    summary: "",
    page_count: "",
    book_image: "https://m.media-amazon.com/images/I/21-kmLZ9t0L._AC_UF1000,1000_QL80_.jpg"
  }

  const [formData, setFormData] = useState(initialState)
  const { books, setBooks } = useContext(BookContext)
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function onAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newBook) => onAddBook(newBook));
        history.push("/")
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="form-text">Add to Our Collection</h1>
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
          onChange={handleChange}
          value={formData.title}
          className="form-input"
          placeholder="Title"
          autoComplete="off"
        />
        <input
          type="text"
          name="author"
          onChange={handleChange}
          value={formData.author}
          className="form-input"
          placeholder="author"
          autoComplete="off"
        />
        <select className="form-input" name="genre" value={formData.genre} onChange={handleChange}>
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
          onChange={handleChange}
          value={formData.summary}
          className="form-textarea"
          placeholder="summary"
          autoComplete="off"
        >
        </textarea>
        <input
          type="text"
          name="page_count"
          onChange={handleChange}
          value={formData.page_count}
          className="form-input"
          placeholder="Page Number"
          autoComplete="off"
        />
        <input
          type="text"
          name="book_image"
          onChange={handleChange}
          value={formData.book_image}
          placeholder="Enter an Image URL"
          className="form-input"
          autoComplete="off"
        />
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookForm;