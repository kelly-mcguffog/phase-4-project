import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
import BooksContainer from "./BooksContainer";
import Login from "./Login";

function Home() {
    const {user} = useContext(UserContext)
    if (user) {
      return(
        <>
            <h1>Welcome, {user.username}!</h1>
            <BooksContainer/>
        </>
      )
    } else {
      return (
        <Login/>
      )
    }
  }
  
  export default Home;