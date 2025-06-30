// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import BookListPage from './pages/BookListPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import CategoryPage from './pages/CategoryPage';
import ThankYouPage from './pages/ThankYouPage';

import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <CartProvider>
            <Routes>
              {/* 不使用 Layout 的頁面 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 使用 Layout 的頁面 */}
              <Route path="/" element={<Layout />}>
                <Route index element={<BookListPage />} />
                <Route path="books" element={<BookListPage />} />
                <Route path="books/:id" element={<BookDetailPage />} /> {/* ✅ 修正這裡 */}
                <Route path="add" element={<AddBookPage />} />
                <Route path="edit/:id" element={<EditBookPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="profile" element={<EditProfilePage />} />
                <Route path="category/:category" element={<CategoryPage />} />
                <Route path="thank-you" element={<ThankYouPage />} />
              </Route>
            </Routes>
          </CartProvider>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
