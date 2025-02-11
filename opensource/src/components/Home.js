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

  if (books.length === 0) {
    return <p>Loading...</p>;
  }

  const bookClick = (book) => {
    console.log("Book clicked:", book);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Book List</h1>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id || book.booktitle} className="book-card" onClick={() => bookClick(book)}> 
            <h2 className="book-title">{book.bookTitle}</h2>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <img src={book.imageURL} alt={book.bookTitle} className="book-image" />
          </div>
        ))}
      </div>

      <div className="footer">
        <footer>&copy; Book Locker Dilvir Noah Kushi </footer>
        </div>
    </div>

  );
};

export default Home;
