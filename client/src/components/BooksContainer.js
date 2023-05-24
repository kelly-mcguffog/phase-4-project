import React, {useState, useContext} from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";
import Search from "./Search";

function BooksContainer() {
    const {books} = useContext(BookContext)

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const [isOn, setIsOn] = useState(false)

    let displayBooks = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    displayBooks = displayBooks.filter(book => {
        const rating = book.reviews.map(review => {
            return review.rating
        })

        const avg = rating.reduce((a, b) => a + b, 0) / rating.length
        const roundedAverage = Math.round(avg)
    
        if(filter === "All"){
            return true
        }else if (filter === "5"){
            return (roundedAverage === 5)
        } else if (filter === "4"){
            return (roundedAverage === 4)
        }else if(filter === "3"){
            return (roundedAverage === 3)
        }else if(filter === "2"){
            return (roundedAverage === 2)
        }else{
            return (roundedAverage === 1)
        }
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
                    <BookItem key={book.id} book={book} isOn={isOn}/>
                ))}
            </div>
        </>
    )
}

export default BooksContainer;