import React from "react";

function Filter({handleFilter}){

       return (   
              <select onChange={handleFilter} className="filter">
                     <option  value="All">All Ratings</option>
                     <option  value="5">5 Stars</option>
                     <option  value="4">4 Stars</option>
                     <option  value="3">3 Stars</option>
                     <option  value="2">2 Stars</option>
                     <option  value="1">1 Star</option>
              </select>
      );    
}

export default Filter;