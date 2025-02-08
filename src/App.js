import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookManager from "./components/BookManager";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookManager />} />

      </Routes>
    </Router>
  );
}

export default App;
