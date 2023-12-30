import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import BookItem from "./BookItem";
import Search from "./Search";

function BooksContainer() {
    const { books } = useContext(BookContext)

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const [isOn, setIsOn] = useState(false)

    if (books === null) return <h1>Loading...</h1>

    let displayBooks = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    displayBooks = displayBooks.filter(book => {
        const ratings = book.reviews.map(book => book.rating)
        const sum_rating = ratings.reduce((sum, num) => sum + num, 0)
        const average_rating = Math.round(sum_rating / ratings.length)

        if (filter === "All") {
            return true
        } else if (filter === "5") {
            return (average_rating === 5)
        } else if (filter === "4") {
            return (average_rating === 4)
        } else if (filter === "3") {
            return (average_rating === 3)
        } else if (filter === "2") {
            return (average_rating === 2)
        } else {
            return (average_rating === 1)
        }
    })

    displayBooks.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
    })

    function handleFilter(e) {
        setFilter(e.target.value)
    }

    function handleClick() {
        setIsOn((isOn) => !isOn);
    }

    return (
        <>
            <div className="menu">
                <div id="search-books">
                    <Search search={search} setSearch={setSearch} handleFilter={handleFilter} />
                </div>
                <label className="switch">
                    <input onClick={handleClick} type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="main">
                {displayBooks.map(book => (
                    <BookItem key={book.id} book={book} isOn={isOn} />
                ))}
            </div>
        </>
    )
}

export default BooksContainer;