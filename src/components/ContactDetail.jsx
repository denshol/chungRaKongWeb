import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { inquiryAPI } from "../services/api"; // 추가
import styles from "../styles/ContactDetail.module.css";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState("");
  const { isAdmin } = useAuth();

  // 문의 상세 정보 가져오기 (Firebase 사용)
  useEffect(() => {
    const fetchInquiryDetail = async () => {
      setLoading(true);
      try {
        // Firebase API 호출
        const data = await inquiryAPI.getInquiryById(id);
        setInquiry(data);
        if (data.response) {
          setEditedResponse(data.response);
        }
      } catch (err) {
        console.error("Failed to fetch inquiry detail:", err);
        setError("문의 상세 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiryDetail();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // 문의 삭제 기능 (Firebase 사용)
  const handleDelete = async () => {
    if (!isAdmin()) {
      alert("관리자 권한이 필요합니다.");
      return;
    }

    if (!window.confirm("정말 이 문의를 삭제하시겠습니까?")) {
      return;
    }

    try {
      // Firebase API 호출
      await inquiryAPI.deleteInquiry(id);
      alert("문의가 성공적으로 삭제되었습니다.");
      navigate("/contact");
    } catch (error) {
      console.error("Delete error:", error);
      alert("문의 삭제 중 오류가 발생했습니다.");
    }
  };

  // 답변 등록/수정 기능 (Firebase 사용)
  const handleResponseSubmit = async () => {
    if (!isAdmin()) {
      alert("관리자 권한이 필요합니다.");
      return;
    }

    try {
      // Firebase API 호출
      const updatedInquiry = await inquiryAPI.updateInquiryResponse(id, {
        response: editedResponse,
        status: "답변완료",
      });

      setInquiry(updatedInquiry);
      setIsEditing(false);
      alert("답변이 성공적으로 등록/수정되었습니다.");
    } catch (error) {
      console.error("Response submit error:", error);
      alert("답변 등록/수정 중 오류가 발생했습니다.");
    }
  };

  // 나머지 렌더링 부분은 동일하게 유지
  if (loading)
    return <div className={styles.loading}>문의 정보를 불러오는 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
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

  return (
    <div className={styles.detailContainer}>
      {/* 기존 UI 그대로 유지 */}
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

      {inquiry.status === "답변완료" && !isEditing && (
        <div className={styles.responseContainer}>
          <h3>답변</h3>
          <div className={styles.response}>
            <p>{inquiry.response || "안녕하세요, 문의해주셔서 감사합니다."}</p>
            <div className={styles.responseInfo}>
              <p>청라콩문화센터 담당자 드림</p>
              <p>답변일: {formatDate(inquiry.updatedAt)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 기능 */}
      {isAdmin() && (
        <div className={styles.adminActions}>
          {isEditing ? (
            <div className={styles.editResponseForm}>
              <h3>답변 {inquiry.response ? "수정" : "등록"}</h3>
              <textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                rows="6"
                className={styles.responseTextarea}
                placeholder="답변 내용을 입력하세요"
              />
              <div className={styles.editActions}>
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelButton}
                >
                  취소
                </button>
                <button
                  onClick={handleResponseSubmit}
                  className={styles.submitButton}
                  disabled={!editedResponse.trim()}
                >
                  {inquiry.response ? "수정하기" : "등록하기"}
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.adminButtons}>
              <button
                onClick={() => {
                  setEditedResponse(inquiry.response || "");
                  setIsEditing(true);
                }}
                className={styles.editButton}
              >
                {inquiry.response ? "답변 수정" : "답변 등록"}
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                문의 삭제
              </button>
            </div>
          )}
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
