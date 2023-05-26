import React, { useState, useContext } from "react";
import { useParams, useHistory} from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";


function EditReview() {
  const {book_id, id} = useParams();
  const {user,setUser} = useContext(UserContext)
  const {books, setBooks} = useContext(BookContext)
  const [hover, setHover] = useState(0)
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const book = books.find(book => book.id == book_id)
  const initialState = book.reviews.find(review => review.id == id)
    
  const [formData, setFormData] = useState(initialState)
  const {comment, rating} = formData


  const onUpdateReview = (updatedReview) => {   
    const bookReviews = book.reviews.map(review => {
      if(review.id === updatedReview.id){
        return updatedReview
      }else{
        return review
      }
    })
  
    const updatedBook = {...book, reviews: bookReviews}

    const updatedBookList = books.map(book => {
      if(book.id === updatedBook.id){
        return updatedBook
      }else{
        return book
      }
    })
    setBooks(updatedBookList)
  
    const updateUserReview = user.reviews.map(review => {
      if(review.id === updatedReview.id){
        return updatedReview
      }else{
        return review
      }
    })
    setUser({...user, reviews: updateUserReview})
  }
    
  const handleChangeInput = (e) => {
    setFormData(editFormData => {
      return({ 
        ...editFormData,
        [e.target.name]: e.target.value
      })          
    })
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    fetch(`/books/${book_id}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if(r.ok){
        r.json().then((updatedReview) => onUpdateReview(updatedReview));
        history.push(`/books/${book_id}`);
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <h1>Edit Review</h1>
          {errors.map((err) => (
            <p key={err} className="error-message">{err}</p>
          ))}
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
            return(
              <button
              type="button"
              key={index}
              name="rating"
              value={index}
              className={index <= (( hover) || rating) ? "on" : "off"}
              onClick={(handleChangeInput)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <button className="form-button" name="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}


export default EditReview;