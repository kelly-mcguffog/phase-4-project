import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import Login from "./Login";
import SignUp from "./SignUp";
import NavBar from "./NavBar";
import Home from "./Home";
import BookDetails from "./BookDetails";
import Profile from "./Profile";
import EditReview from "./EditReview";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";

function App() {
  
  const {user,setUser} = useContext(UserContext)
  
  const {books, setBooks} = useContext(BookContext)

  function onDeleteReview(selectedReview) {
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

  return (
    <>
        <NavBar/>
        <main>
          {user ? (
            <Switch>
              <Route path="/profile">
                <Profile onDeleteReview={onDeleteReview}/>
              </Route>
              <Route path="/books/new">
                  <AddBookForm />
              </Route>
              <Route path="/books/:book_id/reviews/:id">
                  <EditReview />
                </Route>
                <Route exact path="/books/:id/edit">
                  <EditBookForm />
                </Route>
                <Route exact path="/books/:id">
                  <BookDetails onDeleteReview={onDeleteReview}/>
                </Route>
              <Route exact path="/">
                <Home/>
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup">
                <SignUp />
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