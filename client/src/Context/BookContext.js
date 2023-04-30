import React, {useState, useEffect} from 'react'

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("/books")
        .then(r => r.json())
        .then(book => setBooks(book))
          
      }, []);

  return (
    <BookContext.Provider value={{books, setBooks}}>
        {children}
    </BookContext.Provider>
  )
}

export {BookContext, BookProvider}