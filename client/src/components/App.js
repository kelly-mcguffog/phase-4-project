import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import NavBar from "./NavBar";
import Home from "./Home";
import BookDetails from "./BookDetails";
import Profile from "./Profile";
import EditReview from "./EditReview";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";

function App() {

  const { user, setUser } = useContext(UserContext)

  const { books, setBooks } = useContext(BookContext)

  function onDeleteReview(selectedReview) {
    const updatedBooks = books.map(book => {
      const match = [...book.reviews].filter(review => review.id !== selectedReview.id)

      if (book.id === selectedReview.book_id) {
        return { ...book, reviews: match }
      } else {
        return book
      }
    })
    setBooks(updatedBooks)

    const updatedUserReviews = user.reviews.filter(review => review.id !== selectedReview.id)
    setUser({ ...user, reviews: updatedUserReviews })
  }

  return (
    <>
      <NavBar />
      <main>
        {user ? (
          <Routes>
            <Route path="/profile" element={<Profile onDeleteReview={onDeleteReview} />} />
            <Route path="/books/new" element={<AddBookForm />} />
            <Route path="/books/:book_id/reviews/:id/edit" element={<EditReview />} />
            <Route exact path="/books/:id/edit" element={<EditBookForm />} />
            <Route exact path="/books/:id" element={<BookDetails onDeleteReview={onDeleteReview} />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;