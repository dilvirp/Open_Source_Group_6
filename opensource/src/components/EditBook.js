import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookTitle: '',
    author: '',
    description: '',
    price: '',
    genre: '',
    imageURL: '',
    id: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current book data
    fetch(`http://localhost:5189/api/Books/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch book data');
        }
        return response.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure price is sent as a number
      const bookData = {
        ...book,
        price: parseFloat(book.price)
      };

      const response = await fetch(`http://localhost:5189/api/Books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      // Navigate back to book details page after successful update
      navigate(`/book/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <form onSubmit={handleSubmit} className="edit-form">
          <h2>Edit Book</h2>
          
          <div className="form-group">
            <label htmlFor="bookTitle">Title:</label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              value={book.bookTitle}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
              required
              className="form-control"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={book.price}
              onChange={handleChange}
              step="0.01"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">Image URL:</label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={book.imageURL}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="edit-button">
              Save Changes
            </button>
            <button 
              type="button" 
              className="delete-button"
              onClick={() => navigate(`/book/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;