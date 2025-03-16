import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import ContactForm from "./ContactForm";
import styles from "../styles/ContactBoard.module.css";

const ContactBoard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      // 실제 API가 없으므로 임시 데이터 사용
      // 실제 환경에서는 아래 주석 해제
      /*
      const response = await fetch("https://chungrakongback.onrender.com/api/inquiries");
      const data = await response.json();
      setInquiries(data);
      */
      
      // 임시 데이터
      const tempData = [
        {
          id: 1,
          name: "김성도",
          subject: "음악 클래스 문의",
          message: "기타 강의는 초보자도 들을 수 있나요?",
          createdAt: "2025-03-10T14:30:00",
          status: "답변완료",
        },
        {
          id: 2,
          name: "이예배",
          subject: "드럼 수업 일정",
          message: "드럼 수업이 언제 시작되나요?",
          createdAt: "2025-03-12T10:15:00",
          status: "확인중",
        },
        {
          id: 3,
          name: "박찬양",
          subject: "주말 예배 안내",
          message: "주말 예배 시간이 어떻게 되나요?",
          createdAt: "2025-03-14T09:45:00",
          status: "답변완료",
        },
      ];
      
      setInquiries(tempData);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
      setError("문의 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const addInquiry = (newInquiry) => {
    // 실제 환경에서는 API 응답에서 받은 데이터를 사용
    const tempId = inquiries.length + 1;
    const inquiryWithId = {
      ...newInquiry,
      id: tempId,
      createdAt: new Date().toISOString(),
      status: "확인중",
    };
    
    setInquiries([inquiryWithId, ...inquiries]);
    navigate("/contact"); // 목록으로 이동
  };

  return (
    <div className={styles.contactBoardContainer}>
      <h1 className={styles.boardTitle}>문의 게시판</h1>
      
      <div className={styles.boardNav}>
        <Link to="/contact" className={location.pathname === "/contact" ? styles.activeTab : styles.tab}>
          문의 목록
        </Link>
        <Link to="/contact/new" className={location.pathname === "/contact/new" ? styles.activeTab : styles.tab}>
          문의하기
        </Link>
      </div>

      <div className={styles.boardContent}>
        <Routes>
          <Route path="/" element={<ContactList inquiries={inquiries} loading={loading} error={error} />} />
          <Route path="/new" element={<ContactForm onSubmitSuccess={addInquiry} />} />
          <Route path="/:id" element={<ContactDetail inquiries={inquiries} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ContactBoard;