import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ContactList.module.css";

const ContactList = ({ inquiries, loading, error }) => {
  if (loading)
    return <div className={styles.loading}>문의 목록을 불러오는 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className={styles.listContainer}>
      {inquiries.length === 0 ? (
        <div className={styles.noInquiries}>등록된 문의가 없습니다.</div>
      ) : (
        <>
          <div className={styles.listHeader}>
            <span className={styles.idCol}>번호</span>
            <span className={styles.subjectCol}>제목</span>
            <span className={styles.nameCol}>작성자</span>
            <span className={styles.dateCol}>등록일</span>
            <span className={styles.statusCol}>상태</span>
          </div>

          <ul className={styles.inquiryList}>
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} className={styles.inquiryItem}>
                <Link
                  to={`/contact/${inquiry.id}`}
                  className={styles.inquiryLink}
                >
                  <span className={styles.idCol}>{inquiry.id}</span>
                  <span className={styles.subjectCol}>{inquiry.subject}</span>
                  <span className={styles.nameCol}>{inquiry.name}</span>
                  <span className={styles.dateCol}>
                    {formatDate(inquiry.createdAt)}
                  </span>
                  <span
                    className={`${styles.statusCol} ${
                      styles[
                        inquiry.status === "답변완료" ? "completed" : "pending"
                      ]
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={styles.buttonContainer}>
        <Link to="/contact/new" className={styles.writeButton}>
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default ContactList;
