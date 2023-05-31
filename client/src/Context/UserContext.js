import React, {useState, useEffect} from 'react'

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
            setLoading(false)
          }
        });
      }, []);
  
  if(loading) return <h1>Loading..</h1>
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}