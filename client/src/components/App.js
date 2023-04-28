import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import BooksContainer from "./BooksContainer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route exact path="/">
              <Home user={user}/>
            </Route>
            <Route path="/books">
              <BooksContainer />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
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