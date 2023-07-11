import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3/name/${searchQuery}`
      );
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderResults = useMemo(() => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (results.length === 0) {
      return <p>No results found.</p>;
    }
    return (
      <Table bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Flag</th>
            <th>Maps</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, i) => (
            <tr key={res.cca2}>
              <td>{++i}</td>
              <td>{res.name.common}</td>
              <td>{res.name.official}</td>
              <td>{res.flag}</td>
              <td>
                {res.maps.googleMaps},{res.maps.openStreetMaps}
              </td>
              <td>{res.population}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }, [results, loading]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>{renderResults}</div>
    </>
  );
};

export default SearchBar;
