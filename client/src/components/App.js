import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import { ReviewContext } from "../Context/ReviewContext";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";
import Home from "./Home";
import Book from "./Book";
import Profile from "./Profile";
import EditReview from "./EditReview";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";

function App() {
  
  const {user} = useContext(UserContext)
  
  const {reviews, setReviews} = useContext(ReviewContext)
  const {books, setBooks} = useContext(BookContext)
  
  
  function onAddReview(newReview) {
    const updatedBooks = books.map(book => {
      if(book.id === newReview.book_id){
        return {...book, reviews: [...book.reviews, newReview]}
      }else{
        return book
      }
    })
    setBooks(updatedBooks)
    setReviews([...reviews, newReview]);
  }

  function deleteReview(selectedReview) {
    const updatedReviews = reviews.filter(review => review.id !== selectedReview.id)
    const updatedBooks = books.map(book => {
      const match = [...book.reviews].filter(review => review.id !== selectedReview.id)

      if(book.id === selectedReview.book_id){
        return {...book, reviews: match}
      }else{
        return book
      }      
    })
    setBooks(updatedBooks)
    setReviews(updatedReviews)
}

const onUpdateReview = (updatedReview) => {
  const updatedList = reviews.map(review => {
      if(review.id === updatedReview.id){
          return updatedReview
      } else {
          return review
      }
  })
  setReviews(updatedList)

  const updatedBooks = books.map(book => {
    const match = updatedList.filter(review => review.book_id === updatedReview.book_id)
    if(book.id === updatedReview.book_id){
      return {...book, reviews: match}
    }else{
      return book
    }
  })
  setBooks(updatedBooks)
}

const onUpdateBook = (updatedBook) => {
  const updatedList = books.map(book => {
      if(book.id === updatedBook.id){
          return updatedBook
      } else {
          return book
      }
  })
  setBooks(updatedList)
}

const onDeleteBook = (selectedBook) => {
  const updatedBooks = books.filter(book => book.id !== selectedBook.id)
  setBooks(updatedBooks)
}


  return (
    <>
        <NavBar/>
        <main>
          {user ? (
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/books/new">
                  <AddBookForm />
              </Route>
              <Route path="/books/:book_id/reviews/:id/edit">
                  <EditReview onUpdateReview={onUpdateReview}/>
                </Route>
                <Route exact path="/books/:id/edit">
                  <EditBookForm onUpdateBook={onUpdateBook} />
                </Route>
                <Route exact path="/books/:id">
                  <Book deleteReview={deleteReview} onAddReview={onAddReview}/>
                </Route>
              {/* <Route exact path="/books">
                  <BooksContainer onDeleteBook={onDeleteBook}/>
              </Route> */}
              <Route exact path="/">
                <Home onDeleteBook={onDeleteBook}/>
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          )}
        </main>
    </>
  );
}

export default App;