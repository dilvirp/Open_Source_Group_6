import React, { useState } from "react";
import "./AddBook.css"; // Optional: Create a new CSS file for styling

const AddBook = () => {
  const [bookDetails, setBookDetails] = useState({
    bookTitle: "",
    author: "",
    genre: "",
    description: "",
    ISBN: "",
    publicationDate: "",
    imageURL: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (
      !bookDetails.bookTitle ||
      !bookDetails.author ||
      !bookDetails.genre ||
      !bookDetails.ISBN ||
      !bookDetails.price ||
      !bookDetails.publicationDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate price format (should be positive decimal like 11.99, 12.99)
    if (!/^\d+(\.\d{1,2})?$/.test(bookDetails.price)) {
      alert("Please enter a valid price (e.g., 11.99).");
      return;
    }

    // Validate and ISBN length (13 digits)
    if (!/^\d{13}$/.test(bookDetails.ISBN)) {
      alert("ISBN must be exactly 13 digits.");
      return;
    }

    // Validate image URL format
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (bookDetails.imageURL && !urlPattern.test(bookDetails.imageURL)) {
      alert("Please enter a valid image URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5189/api/Books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add the book");
      }

      const data = await response.json();
      console.log(data);
      alert("Book added successfully!");
      // Reset form after successful submission
      setBookDetails({
        bookTitle: "",
        author: "",
        genre: "",
        description: "",
        ISBN: "",
        publicationDate: "",
        imageURL: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="bookTitle">Book Title:</label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            value={bookDetails.bookTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookDetails.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookDetails.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookDetails.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ISBN">ISBN (13 digits):</label>
          <input
            type="text"
            id="ISBN"
            name="ISBN"
            value={bookDetails.ISBN}
            onChange={handleInputChange}
            maxLength="13"
            pattern="\d{13}"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publicationDate">Publication Date:</label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={bookDetails.publicationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageURL">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={bookDetails.imageURL}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={bookDetails.price}
            onChange={handleInputChange}
            required
            pattern="^\d+(\.\d{1,2})?$"
            placeholder="e.g., 11.99"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
