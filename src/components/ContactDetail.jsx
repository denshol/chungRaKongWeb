import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ContactDetail.module.css";

const ContactDetail = ({ inquiries }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const inquiry = inquiries.find((inq) => inq.id === parseInt(id));

  if (!inquiry) {
    return (
      <div className={styles.notFound}>
        <h2>문의를 찾을 수 없습니다.</h2>
        <button
          onClick={() => navigate("/contact")}
          className={styles.backButton}
        >
          목록으로
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>{inquiry.subject}</h2>
        <div className={styles.detailInfo}>
          <span>
            <strong>작성자:</strong> {inquiry.name}
          </span>
          <span>
            <strong>등록일:</strong> {formatDate(inquiry.createdAt)}
          </span>
          <span
            className={`${styles.status} ${
              styles[inquiry.status === "답변완료" ? "completed" : "pending"]
            }`}
          >
            {inquiry.status}
          </span>
        </div>
      </div>

      <div className={styles.detailContent}>
        <h3>문의 내용</h3>
        <p className={styles.message}>{inquiry.message}</p>
      </div>

      {inquiry.status === "답변완료" && (
        <div className={styles.responseContainer}>
          <h3>답변</h3>
          <div className={styles.response}>
            <p>안녕하세요, {inquiry.name}님. 문의해주셔서 감사합니다.</p>
            <p>
              {inquiry.subject.includes("기타") &&
                "기타 강의는 초보자도 수강 가능합니다. 첫 수업에서 기초부터 차근차근 배울 수 있습니다."}
              {inquiry.subject.includes("드럼") &&
                "드럼 수업은 다음 달 첫째 주 월요일부터 시작됩니다. 자세한 일정은 홈페이지 공지사항을 참고해주세요."}
              {inquiry.subject.includes("예배") &&
                "주말 예배는 토요일 저녁 7시, 주일 오전 11시에 진행됩니다."}
            </p>
            <p>더 궁금하신 점이 있으시면 언제든지 문의해주세요.</p>
            <div className={styles.responseInfo}>
              <p>청라콩문화센터 담당자 드림</p>
              <p>답변일: 2025-03-15</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button
          onClick={() => navigate("/contact")}
          className={styles.backButton}
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
