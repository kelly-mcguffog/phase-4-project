import BooksContainer from "./BooksContainer";

function Home({ user }) {
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