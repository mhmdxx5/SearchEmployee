import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Results/Results.css";
import axios from "axios";


const Results = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

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
      toast.error(`An error occurred: ${error} while loading employee data. Please try again later.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      <div className="searchBarResults">
        <div className="searchContainer">
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
      </div>
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
        )}
      {/* </div> */}
      <ToastContainer />
    </>
  );
};

export default Results;
