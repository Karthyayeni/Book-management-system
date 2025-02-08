import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import "../styles/BookManager.css";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    setBooks(response.data);
  };

  const addBook = async () => {
    if (!title || !author || !publishedYear) return;
    await axios.post("http://localhost:5000/api/books", { title, author, publishedYear });
    fetchBooks();
    resetForm();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  const startEditing = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedYear(book.publishedYear);
  };

  const cancelEditing = () => {
    resetForm();
  };

  const updateBook = async () => {
    if (!title || !author || !publishedYear) return;
    await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, {
      title,
      author,
      publishedYear,
    });
    fetchBooks();
    resetForm();
  };

  const resetForm = () => {
    setEditingBook(null);
    setTitle("");
    setAuthor("");
    setPublishedYear("");
  };

  return (
    <div className="book-container">
      <h1>
        <MdOutlineLibraryBooks className="icon" /> Book Management
      </h1>

      {/* Form Section */}
      <div className="book-form">
        <input type="text" placeholder="📖 Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="👤 Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="📅 Published Year" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />

        <div className="form-buttons">
          {editingBook ? (
            <>
              <button className="update-btn" onClick={updateBook}>
                <FaCheck className="icon-btn" /> Update
              </button>
              <button className="cancel-btn" onClick={cancelEditing}>
                <FaTimes className="icon-btn" /> Cancel
              </button>
            </>
          ) : (
            <button className="add-btn" onClick={addBook}>
              <FaPlus className="icon-btn" /> Add Book
            </button>
          )}
        </div>
      </div>

      {/* Book List */}
      <h2>📚 Available Books</h2>
      <div className="book-list">
        {books.length === 0 ? (
          <p className="no-books">No books available. Add a new one! 📚</p>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>👤 {book.author}</p>
                <p>📅 {book.publishedYear}</p>
              </div>
              <div className="book-actions">
                <button className="edit-btn" onClick={() => startEditing(book)}>
                  <FaEdit className="icon-btn" /> Edit
                </button>
                <button className="delete-btn" onClick={() => deleteBook(book._id)}>
                  <FaTrash className="icon-btn" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookManager;
