// 예: ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // 예시: user 객체에 isAdmin 프로퍼티가 있는 경우
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
