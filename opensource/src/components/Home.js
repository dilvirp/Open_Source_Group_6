import React, { useState, useEffect } from "react";
import "../components/Home.css"; 

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5189/api/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching the books data:", error));
  }, []);

  return (
    <div className="wrapper">
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Book Locker</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2 className="book-title">{book.booktitle}</h2>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <img src={book.imageURL} alt={book.booktitle} className="book-image" />
            <div className="book-description">
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="footer">
        <footer>&copy; Book Locker Dilvir Noah Kushi</footer>
      </div>
    </div>
  );
};

export default Home;
