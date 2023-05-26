import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import { useParams, useHistory} from "react-router-dom";

function EditBookForm() {

  const {id} = useParams();
  const {user,setUser} = useContext(UserContext)
  const {books, setBooks} = useContext(BookContext)
  const [errors, setErrors] = useState([])
  const history = useHistory();

  const initialState = books.find(book => book.id == id)
  const [editFormData, setEditFormData] = useState(initialState)

  const {title, author, genre, summary, page_count, book_image} = editFormData

  const onUpdateBook = (updatedBook) => {
    const updatedList = books.map(book => {
      if(book.id === updatedBook.id){
        return updatedBook
      } else {
        return book
      }
    })
    setBooks(updatedList)
  
    const updatedUserBookList = user.reviews.map(review => {
      if(review.book_id === updatedBook.id){
        return {...review, book: updatedBook}
      } else {
        return {...review, book: review.book}
      }
    })
      setUser({...user, reviews: updatedUserBookList})
  }

  const handleChangeInput = (e) => {
    setEditFormData(editFormData => {
      return({ 
        ...editFormData,
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
      body: JSON.stringify(editFormData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedBook) => onUpdateBook(updatedBook));
        history.push(`/books/${id}`);
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
  }
  
  return (
    <div>
      <form className="book-form review-form" onSubmit={handleEditSubmit}>
        <h1>Edit Book Details</h1>
        <ul className="error-message">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
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
        <input 
        type="text" 
        name="genre" 
        onChange={handleChangeInput}
        value={genre}
        className="form-input"
        autoComplete="off"
        />
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