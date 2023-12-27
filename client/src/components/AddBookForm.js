import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useNavigate } from "react-router-dom";

function AddBookForm() {
  
  const { books, setBooks } = useContext(BookContext)
  const [photoFile, setPhotoFile] = useState(null);
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  function onAddBook(newBook) {
    setBooks([...books, newBook]);
  }

  const initialState = {
    title: "",
    author: "",
    genre: "",
    summary: "",
    page_count: ""
  }

  const [formData, setFormData] = useState(initialState);

  function handleChange(event) {
    if (event.target.name === "book_image") {
      setPhotoFile(event.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: null,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("summary", formData.summary);
    data.append("page_count", formData.page_count);
    data.append("book_image", photoFile);

    fetch("/books", {
      method: "POST",
      body: data
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newBook) => onAddBook(newBook));
          navigate("/");
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
          type="file"
          id="book_image"
          name="book_image"
          accept="image/*"
          onChange={handleChange}
        />
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookForm;