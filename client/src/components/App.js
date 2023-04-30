import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BookProvider } from "../Context/BookContext";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import BooksContainer from "./BooksContainer";
import Book from "./Book";
import Profile from "./Profile";
// import { ReviewProvider } from "../Context/ReviewContext";


function App() {
  
  const {user} = useContext(UserContext)

  return (
    <>
        <NavBar />
        <main>
          {user ? (
            <BookProvider>
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              {/* <ReviewProvider> */}
                <Route path="/books/:id">
                  <Book/>
                </Route>
              {/* </ReviewProvider> */}
              <Route exact path="/books">
                  <BooksContainer/>
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            </BookProvider>
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