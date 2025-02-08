import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = (id) => {
    deleteBook(id).then(() => setBooks(books.filter((book) => book._id !== id)));
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author}
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
