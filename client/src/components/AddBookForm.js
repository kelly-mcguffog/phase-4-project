import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../Context/BookContext";

function AddBookForm() {
  const navigate = useNavigate();
  const { books, setBooks } = useContext(BookContext)
  const [errors, setErrors] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);

  const initialState = {
    title: "",
    author: "",
    genre: "Mystery",
    summary: "",
    page_count: ""
  };

  const [formData, setFormData] = useState(initialState);

  function onAddBook(newBook) {
    setBooks([...books, newBook]);
  }

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

    if (photoFile !== null) {
      data.append("book_image", photoFile);
    }

    fetch("/books", {
      method: "POST",
      body: data
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((book) => onAddBook(book));
          navigate("/");
        } else {
          r.json().then((err) => setErrors(err.errors || []));
        }
      });
  }

  return (
    <div className="form">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="form-text head">Add to Our Collection</h1>
        {errors.length > 0 && (
          <ul className="error-message">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          placeholder="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          id="author"
          name="author"
          placeholder="author"
          autoComplete="off"
          value={formData.author}
          onChange={handleChange}
        />

        <select className="form-input" name="genre" value={formData.genre} onChange={handleChange}>
          <option value="Mystery">Mystery</option>
          <option value="Action & Adventure">Action & Adventure</option>
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
        >
        </textarea>
        <input
          type="text"
          id="page_count"
          name="page_count"
          placeholder="page count"
          value={formData.page_count}
          onChange={handleChange}
        />
        <input
          type="file"
          id="book_image"
          name="book_image"
          accept="image/*"
          onChange={handleChange}
        />
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookForm;