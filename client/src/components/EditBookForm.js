import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import { useParams, useHistory} from "react-router-dom";

function EditBookForm({onUpdateBook}) {

    const {id} = useParams();
    const {books} = useContext(BookContext)
    const history = useHistory();

    const initialState = books.find(book => book.id == id)
    const [editFormData, setEditFormData] = useState(initialState)
    const {title, author, genre, summary, page_count, book_image} = editFormData

    const handleChangeInput = (e) => {
        setEditFormData(editFormData => {
           return({ 
                ...editFormData,
                [e.target.name]: e.target.value
            })          
        })
    }

    console.log(id)

    function handleEditSubmit(e) {
        e.preventDefault();
        fetch(`/books/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        })
          .then((r) => r.json())
          .then((updatedBook) => onUpdateBook(updatedBook));
          history.push(`/books/${id}`);
      }
      return (
            <div>
                <form className="edit-form review-form" onSubmit={handleEditSubmit}>
                    <h1>Edit Book Details</h1>
                    <input 
                    type="text" 
                    name="title" 
                    onChange={handleChangeInput}
                    value={title}
                    className="form-input"
                    placeholder="Title"
                    />
                    <input 
                    type="text" 
                    name="author" 
                    onChange={handleChangeInput}
                    value={author}
                    className="form-input"
                    placeholder="author"
                    />
                    <input 
                    type="text" 
                    name="genre" 
                    onChange={handleChangeInput}
                    value={genre}
                    className="form-input"
                    placeholder="genre"
                    />
                    <textarea 
                    name="summary" 
                    onChange={handleChangeInput} 
                    value={summary}
                    className="form-textarea"
                    placeholder="summary"
                    >
                    </textarea>
                    <input 
                    type="text" 
                    name="page_count" 
                    onChange={handleChangeInput}
                    value={page_count}
                    className="form-input"
                    placeholder="Page Number"
                    />
                    <input 
                    type="text" 
                    name="book_image" 
                    onChange={handleChangeInput} 
                    value={book_image}
                    placeholder="Enter an Image URL"
                    className="form-input"
                    />
                    <button className="form-button" name="submit" type="submit">Submit</button>
                </form>
            </div>
          );

}


export default EditBookForm;