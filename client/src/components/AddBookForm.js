import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";

function AddBookForm() {

    const initialState = {
        title: "",
        author: "",
        genre: "",
        summary: "",
        page_count: "",
        book_image: ""
    }

    const [formData, setFormData] = useState(initialState)
    const {books, setBooks} = useContext(BookContext)

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
        })
          .then((r) => r.json())
          .then((newBook) => onAddBook(newBook));
      }
      return (
            <div>
                <form className="review-form" onSubmit={handleSubmit}>
                    <h1>Add to Our Collection</h1>
                    <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange}
                    value={formData.title}
                    className="form-input"
                    placeholder="Title"
                    />
                    <input 
                    type="text" 
                    name="author" 
                    onChange={handleChange}
                    value={formData.author}
                    className="form-input"
                    placeholder="author"
                    />
                    <input 
                    type="text" 
                    name="genre" 
                    onChange={handleChange}
                    value={formData.genre}
                    className="form-input"
                    placeholder="genre"
                    />
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
                    name="page_count" 
                    onChange={handleChange}
                    value={formData.page_count}
                    className="form-input"
                    placeholder="Page Number"
                    />
                    <input 
                    type="text" 
                    name="book_image" 
                    onChange={handleChange} 
                    value={formData.book_image}
                    placeholder="Enter an Image URL"
                    className="form-input"
                    />
                    <button className="form-button" name="submit" type="submit">Submit</button>
                </form>
            </div>
          );

}


export default AddBookForm;