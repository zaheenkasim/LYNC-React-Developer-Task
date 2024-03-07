import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './components/Homepage';
import BookDetails from './components/BookDetails';
import Authentication from './components/Authentication';
import Bookmarks from './components/Bookmarks';
import Cart from './components/Cart';
import OrderedBooks from './components/OrderedBooks';

const App: React.FC = () => {
  let data = localStorage.getItem("isLogin");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Authentication />} />
        {data === "true" ? (
          <>
            <Route path="/home" element={<Homepage />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderedBooks />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
