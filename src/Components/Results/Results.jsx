import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Results/Results.css";

const Results = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);
  const loadEmployeeData = async () => {
    try {
      const res = await axios.get("https://64ac614a931d8900814d50c7--resonant-cat-d28ea4.netlify.app/api/employees/");
      setSearchResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadEmployeeData();
  }, []);

  const handleSearch = (result) => {
    setSearchCompleted(false);
    const query = result.target.value;
    setSearchQuery(query);
  };

  const handleClickSearch = () => {
    setSearchCompleted(true);
  };

  const highlightText = (text) => {
    const startIndex = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (startIndex === -1) {
      return text;
    }

    const endIndex = startIndex + searchQuery.length;
    return (
      <>
        {text.substring(0, startIndex)}
        <span className="highlighted">{text.substring(startIndex, endIndex)}</span>
        {text.substring(endIndex)}
      </>
    );
  };

  return (
    <>
      <label className="labelTitle">
        {searchCompleted ? "Search Completed" : "Looking for an employee"}
      </label>
      <label className="searchLabel">
        Click on the search bar to learn our suggestion
      </label>
      <div className="searchContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={handleSearch}
            className="searchInput"
          />
          <i
            className="searchIcon fa fa-search "
            onClick={handleClickSearch}
          ></i>
        </div>
        <ul className="searchResults">
          {searchResults &&
            searchResults
              ?.filter(
                (emp) =>
                  emp?.name?.toLowerCase().includes(searchQuery) ||
                  emp?.role?.toLowerCase().includes(searchQuery)
              )
              .map((employee) => (
                <li key={employee.id} className="searchResult">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="resultImage"
                  />
                  <div>
                    <p className="resultName">
                      {searchCompleted ? employee.name : highlightText(employee.name)}
                    </p>
                    <p className="resultRole">
                      {searchCompleted ? employee.role : highlightText(employee.role)}
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Results;
