// components/members/Pagination.jsx
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { PrevIcon, NextIcon } from "../icons/Icons";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  // 페이지 숫자 배열 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // 페이지 수가 5개 미만일 경우 조정
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    if (onPageChange) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {/* 이전 페이지 버튼 */}
      <button
        className={styles.pageItem}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PrevIcon />
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`${styles.pageItem} ${
            currentPage === page ? styles.pageItemActive : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className={styles.pageItem}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default Pagination;
