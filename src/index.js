// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// (AuthProvider가 있다면, AuthProvider로 감싸주어야 함)
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
