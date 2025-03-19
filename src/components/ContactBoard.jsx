import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import ContactForm from "./ContactForm";
import { inquiryAPI } from "../services/api";
import styles from "../styles/ContactBoard.module.css";

const ContactBoard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // 문의 목록 가져오기
  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await inquiryAPI.getAllInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
      setError("문의 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // 새 문의 추가
  const addInquiry = useCallback(
    (newInquiry) => {
      setInquiries((prev) => [newInquiry, ...prev]);
      navigate("/contact");
    },
    [navigate]
  );

  return (
    <div className={styles.contactBoardContainer}>
      <h1 className={styles.boardTitle}>문의 게시판</h1>

      {isAdmin() && (
        <div className={styles.adminNotice}>
          관리자 권한으로 접속 중입니다. 모든 문의에 대한 답변 및 삭제 권한이
          있습니다.
        </div>
      )}

      <div className={styles.boardNav}>
        <Link
          to="/contact"
          className={
            location.pathname === "/contact" ? styles.activeTab : styles.tab
          }
        >
          문의 목록
        </Link>
        <Link
          to="/contact/new"
          className={
            location.pathname === "/contact/new" ? styles.activeTab : styles.tab
          }
        >
          문의하기
        </Link>
      </div>

      <div className={styles.boardContent}>
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                inquiries={inquiries}
                loading={loading}
                error={error}
                onRefresh={fetchInquiries}
              />
            }
          />
          <Route
            path="/new"
            element={<ContactForm onSubmitSuccess={addInquiry} />}
          />
          <Route path="/:id" element={<ContactDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default ContactBoard;
