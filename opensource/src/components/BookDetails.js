import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/BookDetails.css";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5189/api/Books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched book data:", data);
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await fetch(`http://localhost:5189/api/Books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete book');
        }

        navigate("/"); // Navigate back to home page after deletion
      } catch (err) {
        setError("Failed to delete the book");
      }
    }
  };



  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="error">No book found</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <div className="book-image-container">
          <img
            src={book.imageURL}
            alt={book.bookTitle}
            className="book-detail-image"
          />
        </div>
        <div className="book-info">
          <h1 className="book-title">{book.bookTitle}</h1>
          <h2 className="book-author">By {book.author}</h2>
          <div className="book-price">${book.price}</div>
          <div className="book-detail-description">
            <h3>Description:</h3>
            <p>{book.description}</p>
          </div>
          <div className="book-genre">
            <h3>Genre of Book:</h3>
            <p>{book.genre}</p>
          </div>
          <div>
          <div className="book-actions">
          <button 
              onClick={() => navigate(`/edit-book/${id}`)} 
              className="edit-button">
                EditBook
            </button>  
            <button onClick={handleDelete} 
            className="delete-button">
              Delete Book
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;