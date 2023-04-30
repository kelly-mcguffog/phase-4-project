import React, {useContext} from "react";
import { UserContext } from "../Context/UserContext";
import BooksContainer from "./BooksContainer";

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
      return <h1>Please Login or Sign Up</h1>;
    }
  }
  
  export default Home;