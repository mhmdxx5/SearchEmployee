import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Results/Results.css";
import axios from "axios";

const Results = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  // Function to load employee data from API or local storage
  const loadEmployeeData = async () => {
    try {
      const cachedData = localStorage.getItem("employeeData");
      if (cachedData) {
        setSearchResults(JSON.parse(cachedData));
      } else {
        const res = await axios.get("https://searchserver.fly.dev/api/employees/");
        setSearchResults(res.data);
        localStorage.setItem("employeeData", JSON.stringify(res.data));
      }
    } catch (error) {
      // Display error toast if loading employee data fails
      toast.error(`An error occurred: ${error} while loading employee data. Please try again later.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    // Load employee data when component mounts
    loadEmployeeData();
  }, []);

  const handleSearch = (result) => {
    // Update search query as user types
    setSearchCompleted(false);
    const query = result.target.value;
    setSearchQuery(query);
  };

  const handleClickSearch = () => {
    // Set search as completed when search icon is clicked
    setSearchCompleted(true);
  };

  const highlightText = (text) => {
    // Function to highlight matched search query in text
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
      <div className="searchBarResults">
        <div className="searchContainer">
          {/* Input field for search query */}
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={handleSearch}
            className="searchInput"
          />
          {/* Search icon */}
          <i
            className="searchIcon fa fa-search"
            onClick={handleClickSearch}
          ></i>
        </div>
      </div>
      {/* Render search results */}
      {searchQuery && (
        <ul className={searchCompleted ? "searchBarResults searchCompleted" : "searchBarResults"}>
          {searchResults &&
            searchResults
              ?.filter(
                (emp) =>
                  emp?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  emp?.role?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((employee) => (
                <li key={employee.id} className="searchResult">
                  {/* Employee photo */}
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="resultImage"
                  />
                  <div>
                    {/* Display employee name */}
                    <p className="resultName">
                      {searchCompleted ? employee.name : highlightText(employee.name)}
                    </p>
                    {/* Display employee role */}
                    <p className="resultRole">
                      {searchCompleted ? employee.role : highlightText(employee.role)}
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      )}
      <ToastContainer />
    </>
  );
};

export default Results;
