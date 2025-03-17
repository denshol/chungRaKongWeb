import React, { Suspense, lazy, useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/main.css";
import VideoLectureBoard from "./pages/VideoLectureBoard";
import Register from "./pages/Register";
import FeaturedClasses from "./components/FeaturedClasses";
import FeaturedClasses2 from "./components/FeaturedClasses2";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import ProgramRanking from "./components/ProgramRanking";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import ContactBoard from "./components/ContactBoard";
import NoticeModal from "./components/NoticeModal";
import SideNoticeBanner from "./components/SideNoticeBanner";
import StudyAbroad from "./pages/StudyAbroad";

const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Login = lazy(() => import("./pages/Login"));

// HeroSlider를 조건부로 렌더링하는 컴포넌트
const ConditionalHeroSlider = () => {
  const location = useLocation();

  if (location.pathname === "/about") {
    return null;
  }

  return <HeroSlider />;
};

function App() {
  const { user } = useContext(AuthContext);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [manualShowModal, setManualShowModal] = useState(false);
  const [notices, setNotices] = useState([]);

  // 공지사항 데이터 불러오기
  useEffect(() => {
    // 실제 구현 시 API에서 데이터를 가져오도록 변경
    // 현재는 예시 데이터 사용
    const fetchNotices = async () => {
      try {
        // 실제 API 호출로 대체
        // const response = await fetch('/api/notices');
        // const data = await response.json();

        // 샘플 데이터
        const sampleNotices = [
          {
            id: 1,
            title: "3월 신규 강좌 개설 안내",
            content:
              "음악 이론 및 작곡 클래스가 새롭게 개설되었습니다. 많은 관심 부탁드립니다.",
            date: "2025-03-15",
            urgent: true,
            link: "/services",
            imageUrl:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            title: "청라콩 음악회 개최 안내",
            content:
              "오는 4월 10일 청라콩 음악회가 개최됩니다. 학생들의 많은 참여 바랍니다.",
            date: "2025-03-14",
            urgent: false,
            link: "/about",
            imageUrl:
              "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          },
        ];

        setNotices(sampleNotices);

        // 새 공지사항 확인
        const shouldShowModal = checkIfShouldShowModal(sampleNotices);
        setShowNoticeModal(shouldShowModal);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류 발생:", error);
      }
    };

    fetchNotices();
  }, []);

  // 모달을 표시해야 하는지 확인하는 함수
  const checkIfShouldShowModal = (noticeList) => {
    if (!noticeList || noticeList.length === 0) return false;

    // 쿠키에서 마지막으로 모달을 닫은 날짜 확인
    const lastClosedDate = localStorage.getItem("noticeModalLastClosed");
    const today = new Date().toDateString();

    // 오늘 이미 모달을 닫았는지 확인
    if (lastClosedDate === today) {
      return false;
    }

    // 새로운 공지사항이 있는지 확인 (최신 공지가 3일 이내인 경우)
    const latestNotice = noticeList[0];
    const noticeDate = new Date(latestNotice.date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    return noticeDate >= threeDaysAgo || latestNotice.urgent;
  };

  // 배너 클릭 핸들러
  const handleBannerClick = () => {
    setManualShowModal(true);
  };

  // 모달 닫기 함수
  const closeNoticeModal = () => {
    setShowNoticeModal(false);
    setManualShowModal(false);
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* 사이드 공지사항 배너 추가 */}
      {notices.length > 0 && (
        <SideNoticeBanner
          onClick={handleBannerClick}
          noticeCount={notices.length}
        />
      )}

      {/* 공지사항 모달 */}
      {(showNoticeModal || manualShowModal) && notices.length > 0 && (
        <NoticeModal
          isOpen={true}
          notices={notices}
          onClose={closeNoticeModal}
        />
      )}

      <Suspense fallback={<Loading />}>
        <ConditionalHeroSlider />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
              </>
            }
          />
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Programs />} />
          <Route path="/contact/*" element={<ContactBoard />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video-lectures" element={<VideoLectureBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ranking" element={<ProgramRanking />} />
          <Route path="/music" element={<FeaturedClasses />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/study-abroad" element={<StudyAbroad />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
