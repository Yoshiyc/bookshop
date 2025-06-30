// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("userList");
    return stored ? JSON.parse(stored) : [];
  });

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (newUser) => {
    const exists = users.some((u) => u.email === newUser.email);
    if (exists) return false;
    const userWithId = { ...newUser, uid: Date.now().toString() };
    const updated = [...users, userWithId];
    setUsers(updated);
    localStorage.setItem("userList", JSON.stringify(updated));
    setCurrentUser(userWithId);
    localStorage.setItem("currentUser", JSON.stringify(userWithId));
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
