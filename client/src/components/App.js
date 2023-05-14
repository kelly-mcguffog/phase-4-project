import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
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
  
  const {user,setUser} = useContext(UserContext)
  
  const {books, setBooks} = useContext(BookContext)
  
  function onAddReview(newReview) {
    const updatedBooks = books.map(book => {
      if(book.id === newReview.book_id){
        return {...book, reviews: [...book.reviews, newReview]}
      }else{
        return book
      }
    })
    if(newReview.user_id === user.id){
      setUser({...user, reviews: [...user.reviews, newReview]})
    }else{
      return user
    }
    setBooks(updatedBooks)
  }

  function deleteReview(selectedReview) {
    const updatedBooks = books.map(book => {
      const match = [...book.reviews].filter(review => review.id !== selectedReview.id)

      if(book.id === selectedReview.book_id){
        return {...book, reviews: match}
      }else{
        return book
      }      
    })
    setBooks(updatedBooks)

    const updatedUserReviews = user.reviews.filter(review => review.id !== selectedReview.id)
    setUser({...user, reviews: updatedUserReviews})

}

const onUpdateReview = (updatedReview) => {   
    const selectedBook = books.find(book => book.id === updatedReview.book_id)
    const bookReviews = selectedBook.reviews.map(review => {
      if(review.id === updatedReview.id){
        return updatedReview
      }else{
        return review
      }
    })

    const updatedBook = {...selectedBook, reviews: bookReviews}

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

const onDeleteBook = (selectedBook) => {
  const updatedBooks = books.filter(book => book.id !== selectedBook.id)
  setBooks(updatedBooks)

  const updatedUserBooks = user.reviews.filter(review => review.book_id !== selectedBook.id)
  setUser({...user, reviews: updatedUserBooks})
}


  return (
    <>
        <NavBar/>
        <main>
          {user ? (
            <Switch>
              <Route path="/profile">
                <Profile deleteReview={deleteReview}/>
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