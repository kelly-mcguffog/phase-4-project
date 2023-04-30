import React, {useState, useEffect} from 'react'

const ReviewContext = React.createContext();

const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews")
        .then(r => r.json())
        .then(reviews => setReviews(reviews))
          
      }, []);


  return (
    <ReviewContext.Provider value={{reviews, setReviews}}>
        {children}
    </ReviewContext.Provider>
  )
}

export {ReviewContext, ReviewProvider}