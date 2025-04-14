import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    const delaySearch = setTimeout(() => {
      setError(null);
      setLoading(true);
      fetch(
        `http://localhost:5189/api/Books/search?title=${encodeURIComponent(
          searchInput
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch search results");
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((error) => {
          setSearchResults([]);
          setError(error.message);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="search-container">
      <h2>Can't find the book you want? Search for it</h2>

      <input
        type="text"
        placeholder="Enter book title..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((book) => (
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className="search-item"
            >
              {book.bookTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
