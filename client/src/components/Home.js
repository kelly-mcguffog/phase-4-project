import Profile from "./Profile";

function Home({ user }) {
    if (user) {
    //   return <h1>Welcome, {user.username}!</h1>;
    return(
      <Profile user={user}/>
    )} else {
      return <h1>Please Login or Sign Up</h1>;
    }
  }
  
  export default Home;
  