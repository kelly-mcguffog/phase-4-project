import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import { useParams, useNavigate } from "react-router-dom";

function EditBookForm() {

  const { id } = useParams();
  const { user, setUser } = useContext(UserContext)
  const { books, setBooks } = useContext(BookContext)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    summary: "",
    page_count: "",
    book_image: "",
  });

  const findBook = books?.find((book) => book.id === parseInt(id));


  useEffect(() => {
    if (findBook) {
      setFormData({
        title: findBook.title,
        author: findBook.author,
        genre: findBook.genre,
        summary: findBook.summary,
        page_count: findBook.page_count,
        book_image: findBook.book_image,
      });
    }
  }, [findBook]);

  if (!findBook || books === null) return <h1>loading</h1>

  const { title, author, genre, summary, page_count } = formData;

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
    if (e.target.name === "book_image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((editFormData) => ({
          ...editFormData,
          book_image: {
            url: reader.result,
            file: file,
          },
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((editFormData) => ({
        ...editFormData,
        [e.target.name]: e.target.value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: null,
      }));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.book_image.file) {
      formDataToSend.append("book_image", formData.book_image.file);
    }
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("summary", formData.summary);
    formDataToSend.append("page_count", formData.page_count);

    fetch(`/books/${id}`, {
      method: "PATCH",
      body: formDataToSend,
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((book) => onUpdateBook(book));
          navigate(`/books/${id}`)
        } else {
          r.json().then((err) => setErrors(err.errors || []));
        }
      });
  };
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
          type="file"
          className="form-input"
          name="book_image"
          accept="image/*"
          onChange={handleChangeInput}
        />
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}


export default EditBookForm;