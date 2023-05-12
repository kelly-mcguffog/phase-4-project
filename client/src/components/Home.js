import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
import BooksContainer from "./BooksContainer";
import Login from "./Login";

function Home({onDeleteBook}) {
    const {user} = useContext(UserContext)

    if (user) {
      return(
        <>
            <h1 className="welcome-text">BookClub</h1>
            <BooksContainer onDeleteBook={onDeleteBook}/>
        </>
      )
    } else {
      return (
        <Login/>
      )
    }
  }
  
  export default Home;