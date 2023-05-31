import React, {useState, useEffect} from 'react'

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/books")
        .then(r => r.json())
        .then(book => setBooks(book))
        setLoading(false)
      }, []);
  if(loading) return <h1>Loading..</h1>
  return (
    <BookContext.Provider value={{books, setBooks}}>
        {children}
    </BookContext.Provider>
  )
}

export {BookContext, BookProvider}