import React from "react";

function Filter({handleFilter}){

    return (   
         <select onChange={handleFilter} className="filter">
                <option name="rating" value="All">All</option>
                <option name="rating" value={5}>5</option>
                <option name="rating" value={4}>4</option>
                <option name="rating" value={3}>3</option>
                <option name="rating" value={2}>2</option>
                <option name="rating" value={1}>1</option>
         </select>
      );    
}

export default Filter;