// src/components/common/RouteGuards.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// 로그인한 사용자만 접근 가능한 라우트
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // 로딩 상태일 때 표시할 컴포넌트
    return <div className="loading-container">로딩 중...</div>;
  }

  if (!user) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return children;
};

// 미로그인 상태에서만 접근 가능한 라우트 (로그인, 회원가입 등)
export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-container">로딩 중...</div>;
  }

  // 이미 로그인한 경우 홈 또는 이전 페이지로 리다이렉트
  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // 로그인하지 않은 경우 자식 컴포넌트 렌더링
  return children;
};

// 관리자만 접근 가능한 라우트
export const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-container">로딩 중...</div>;
  }

  // 로그인하지 않았거나 관리자가 아닌 경우
  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // 관리자인 경우 자식 컴포넌트 렌더링
  return children;
};
