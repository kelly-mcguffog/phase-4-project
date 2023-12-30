import React from "react";
import Filter from "./Filter";

function Search({ search, setSearch, handleFilter }) {

  return (
    <>
      <Filter handleFilter={handleFilter} />
      <div className="search">
        <input placeholder="search..." onChange={(e) => setSearch(e.target.value)} className="input-search" value={search} />
      </div>
    </>
  );
}

export default Search;
