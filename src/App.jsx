import React, {
  Suspense,
  lazy,
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/main.css";
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import NoticeModal from "./components/NoticeModal";
import SideNoticeBanner from "./components/SideNoticeBanner";

// 자주 사용되는 핵심 컴포넌트는 일반 임포트
import Main from "./pages/Main";
import ScrollToTop from "./components/ScrollToTop";

// 중요하지만 초기 렌더링에 필요하지 않은 컴포넌트들은 preload 설정
const VideoLectureBoard = lazy(() => {
  const component = import("./pages/VideoLectureBoard");
  // 사용자가 페이지에 도착하면 미리 로드
  component.then(() => console.log("VideoLectureBoard preloaded"));
  return component;
});

const FeaturedClasses = lazy(() => import("./components/FeaturedClasses"));
const FeaturedClasses2 = lazy(() => import("./components/FeaturedClasses2"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProgramRanking = lazy(() => import("./components/ProgramRanking"));
const ContactBoard = lazy(() => import("./components/ContactBoard"));
const StudyAbroad = lazy(() => import("./pages/StudyAbroad"));

// 더 나중에 필요한 컴포넌트들은 일반 지연 로딩
const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const MyPage = lazy(() => import("./components/auth/MyPage"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));

// 메모이제이션된 보호된 라우트 컴포넌트
const ProtectedRoute = memo(({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
});

// 메모이제이션된 관리자 전용 라우트 컴포넌트
const AdminRoute = memo(({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
});

// 메모이제이션된 공개 전용 라우트 컴포넌트
const PublicOnlyRoute = memo(({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
});

// 메모이제이션된 HeroSlider 조건부 렌더링 컴포넌트
const ConditionalHeroSlider = memo(() => {
  const location = useLocation();

  // useMemo로 제외 경로 최적화
  const shouldRender = useMemo(() => {
    const exclusionPaths = [
      "/about",
      "/login",
      "/register",
      "/mypage",
      "/admin",
    ];
    return !exclusionPaths.includes(location.pathname);
  }, [location.pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Suspense fallback={<div style={{ height: "500px" }}></div>}>
      <HeroSlider />
    </Suspense>
  );
});

// 메인 앱 콘텐츠 메모이제이션
const AppContent = memo(() => {
  const { currentUser } = useAuth();
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [manualShowModal, setManualShowModal] = useState(false);
  const [notices, setNotices] = useState([]);

  // 공지사항 데이터 불러오기 - useCallback으로 최적화
  const fetchNotices = useCallback(async () => {
    try {
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
          imageUrl: [
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514119412350-e174d90d280e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          ],
        },
        {
          id: 2,
          title: "청라콩 음악회 개최 안내",
          content:
            "오는 4월 10일 청라콩 음악회가 개최됩니다. 학생들의 많은 참여 바랍니다.",
          date: "2025-03-14",
          urgent: false,
          link: "/about",
          imageUrl: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          ],
        },
        {
          id: 3,
          title: "프로그래밍 특강: 코딩 부트캠프",
          content:
            "4월 15일부터 시작되는 코딩 부트캠프에 참여하세요. 초보자도 참여 가능합니다.",
          date: "2025-03-12",
          urgent: false,
          link: "/services",
          imageUrl: [
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          ],
        },
        {
          id: 4,
          title: "신규 도서관 자료 소개",
          content:
            "청라콩 문화센터 도서관에 신규 도서 및 멀티미디어 자료가 입고되었습니다.",
          date: "2025-03-10",
          urgent: false,
          link: "/about",
          imageUrl: [
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          ],
        },
        {
          id: 5,
          title: "여름방학 특별 프로그램 안내",
          content:
            "6월부터 시작되는 여름방학 특별 프로그램 등록이 시작되었습니다. 조기 등록 시 할인 혜택을 드립니다.",
          date: "2025-03-08",
          urgent: true,
          link: "/services",
          imageUrl: [
            "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          ],
        },
      ];

      // 이미지 미리 로드
      sampleNotices.forEach((notice) => {
        if (notice.imageUrl && notice.imageUrl.length > 0) {
          // 첫 번째 이미지만 미리 로드 (다른 이미지는 필요할 때 로드)
          const img = new Image();
          img.src = notice.imageUrl[0];
        }
      });

      setNotices(sampleNotices);

      // 새 공지사항 확인
      const shouldShowModal = checkIfShouldShowModal(sampleNotices);
      setShowNoticeModal(shouldShowModal);
    } catch (error) {
      console.error("공지사항을 불러오는 중 오류 발생:", error);
    }
  }, []);

  // 모달을 표시해야 하는지 확인하는 함수 - useCallback으로 최적화
  const checkIfShouldShowModal = useCallback((noticeList) => {
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
  }, []);

  // 컴포넌트 마운트 시 공지사항 불러오기
  useEffect(() => {
    fetchNotices();

    // 초기 로드 후 1초 후 중요한 컴포넌트 미리 로드
    const preloadTimer = setTimeout(() => {
      import("./components/FeaturedClasses");
      import("./components/FeaturedClasses2");
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, [fetchNotices]);

  // 배너 클릭 핸들러 - useCallback으로 최적화
  const handleBannerClick = useCallback(() => {
    setManualShowModal(true);
  }, []);

  // 모달 닫기 함수 - useCallback으로 최적화
  const closeNoticeModal = useCallback(() => {
    setShowNoticeModal(false);
    setManualShowModal(false);
    // 오늘 날짜 저장
    localStorage.setItem("noticeModalLastClosed", new Date().toDateString());
  }, []);

  // 라우트 설정 - useMemo로 최적화
  const appRoutes = useMemo(
    () => (
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<Main />} />
        <Route
          path="/program/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProgramDetail />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<Loading />}>
              <Programs />
            </Suspense>
          }
        />
        <Route
          path="/contact/*"
          element={
            <Suspense fallback={<Loading />}>
              <ContactBoard />
            </Suspense>
          }
        />
        <Route
          path="/video-lectures"
          element={
            <Suspense fallback={<Loading />}>
              <VideoLectureBoard />
            </Suspense>
          }
        />
        <Route
          path="/ranking"
          element={
            <Suspense fallback={<Loading />}>
              <ProgramRanking />
            </Suspense>
          }
        />
        <Route
          path="/music"
          element={
            <Suspense fallback={<Loading />}>
              <FeaturedClasses />
            </Suspense>
          }
        />
        <Route
          path="/study-abroad"
          element={
            <Suspense fallback={<Loading />}>
              <StudyAbroad />
            </Suspense>
          }
        />

        {/* 로그인한 사용자가 접근 불가한 라우트 */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            </PublicOnlyRoute>
          }
        />

        {/* 인증 필요 라우트 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <MyPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 관리자 전용 라우트 */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            </AdminRoute>
          }
        />

        {/* 404 페이지 - 라우트를 찾을 수 없을 때 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    ),
    []
  );

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* 사이드 공지사항 배너 */}
      {/* {notices.length > 0 && (
        <SideNoticeBanner
          onClick={handleBannerClick}
          noticeCount={notices.length}
        />
      )} */}

      {/* 공지사항 모달 - 조건부 렌더링 최적화 */}
      {(showNoticeModal || manualShowModal) && notices.length > 0 && (
        <NoticeModal
          isOpen={true}
          notices={notices}
          onClose={closeNoticeModal}
        />
      )}

      <ConditionalHeroSlider />

      {/* 중첩된 Suspense 제거하고 각 라우트에 개별적으로 Suspense 적용 */}
      {appRoutes}

      <Footer />
    </>
  );
});

// 메인 App 컴포넌트 자체도 메모이제이션
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
