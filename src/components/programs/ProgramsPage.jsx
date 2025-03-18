// components/programs/ProgramsPage.jsx
import React, { useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";

const ProgramsPage = ({ programs, categories }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 카테고리 및 검색어에 따른 필터링된 프로그램 목록
  const filteredPrograms = programs.filter((program) => {
    // 카테고리 필터링
    const categoryMatch =
      activeCategory === "all" || program.category === activeCategory;

    // 검색어 필터링
    const searchMatch =
      !searchTerm ||
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className={styles.programsPage}>
      <div className={styles.membersHeader}>
        <h1 className={styles.membersTitle}>프로그램 관리</h1>
        <div className={styles.membersActions}>
          <div className={styles.searchBox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="프로그램 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            새 프로그램 등록
          </button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className={styles.memberTabs}>
        <button
          className={`${styles.memberTab} ${
            activeCategory === "all" ? styles.memberTabActive : ""
          }`}
          onClick={() => setActiveCategory("all")}
        >
          전체
        </button>
        {Object.values(categories).map((category) => (
          <button
            key={category}
            className={`${styles.memberTab} ${
              activeCategory === category ? styles.memberTabActive : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 프로그램 목록 */}
      <div className={styles.membersSection}>
        <div className={styles.membersTableContainer}>
          <table className={styles.membersTable}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>ID</th>
                <th style={{ width: "100px" }}>이미지</th>
                <th>프로그램명</th>
                <th>카테고리</th>
                <th>강사</th>
                <th>일정</th>
                <th>위치</th>
                <th>인기</th>
                <th style={{ width: "120px" }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan="9" className={styles.emptyCell}>
                    프로그램을 찾을 수 없습니다.
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((program) => (
                  <tr key={program.id}>
                    <td>{program.id}</td>
                    <td>
                      <div className={styles.thumbnailContainer}>
                        <img
                          src={program.image}
                          alt={program.title}
                          className={styles.programThumbnail}
                        />
                      </div>
                    </td>
                    <td className={styles.memberName}>{program.title}</td>
                    <td>{program.category}</td>
                    <td>{program.instructor}</td>
                    <td>{program.schedule}</td>
                    <td>{program.location}</td>
                    <td>
                      {program.isFeatured ? (
                        <span
                          className={`${styles.statusBadge} ${styles.statusActive}`}
                        >
                          인기
                        </span>
                      ) : (
                        <span
                          className={`${styles.statusBadge} ${styles.statusInactive}`}
                        >
                          일반
                        </span>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={`${styles.btnAction} ${styles.btnView}`}
                          title="보기"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button
                          className={`${styles.btnAction} ${styles.btnEdit}`}
                          title="수정"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          className={`${styles.btnAction} ${styles.btnDelete}`}
                          title="삭제"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
