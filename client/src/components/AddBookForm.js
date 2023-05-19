import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useHistory} from "react-router-dom";

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
    const {books, setBooks} = useContext(BookContext)
    const history = useHistory()
    const [errors, setErrors] = useState([])
  

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
            <div>
                <form className="book-form review-form" onSubmit={handleSubmit}>
                    <h1>Add to Our Collection</h1>
                    <ul className="error-message">
                      {errors.map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
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
                    <input 
                    type="text" 
                    name="genre" 
                    onChange={handleChange}
                    value={formData.genre}
                    className="form-input"
                    placeholder="genre"
                    autoComplete="off"
                    />
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