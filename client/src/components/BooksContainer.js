import React, {useState, useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";
import Search from "./Search";

function BooksContainer({onDeleteBook}) {
    const {books} = useContext(BookContext)

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const [isOn, setIsOn] = useState(false)

    let displayBooks = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    displayBooks = displayBooks.filter(book => {
        if(filter === "All") return true;
        return book.average_rating === filter;
    })
    displayBooks.sort(function(a, b) {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
     })

     function handleFilter(e){
        setFilter(e.target.value)
      }
  


    function handleClick() {
        setIsOn((isOn) => !isOn);
    }


    return(
        <>
        <div className="menu">
        <Search search={search} setSearch={setSearch} handleFilter={handleFilter}/>
        <label className="switch">
            <input onClick={handleClick} type="checkbox"/>
            <span className="slider round"></span>
        </label>
        </div>
        <div className="main">
            {displayBooks.map(book => (
                <BookItem key={book.id} book={book} isOn={isOn} onDeleteBook={onDeleteBook}/>
            ))}
        </div>
        </>
    )
}

export default BooksContainer;