// App.jsx
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
import SkeletonLoader from "./components/SkeletonLoader";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import NoticeModal from "./components/NoticeModal";
import SideNoticeBanner from "./components/SideNoticeBanner";

// 자주 사용되는 핵심 컴포넌트는 일반 임포트
import Main from "./pages/Main";
import ScrollToTop from "./components/ScrollToTop";
import imageElecHan from "./assets/image/poster/chungRaElecHan.jpg";
import imageUkelelePos from "./assets/image/poster/chungRaUkelelePoster.jpg";
import imagePilatesPos from "./assets/image/programImages/chungRaPilates.jpg";
import FindId from "./components/auth/FindId";
import FindPassword from "./components/auth/FindPassword";

// 중요하지만 초기 렌더링에 필요하지 않은 컴포넌트들은 preload 설정
const VideoLectureBoard = lazy(() => {
  const component = import("./pages/VideoLectureBoard");
  // 사용자가 페이지에 도착하면 미리 로드
  component.then(() => console.log("VideoLectureBoard preloaded"));
  return component;
});

const FeaturedClasses = lazy(() => import("./components/FeaturedClasses"));
const FeaturedClasses2 = lazy(() => import("./components/FeaturedClasses2"));

// AdminDashboard를 FirebaseAdminDashboard로 변경
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

// 개선된 보호된 라우트 컴포넌트
const ProtectedRoute = memo(({ children }) => {
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (loading || !authChecked) {
    return <SkeletonLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
});

// 개선된 관리자 전용 라우트 컴포넌트
const AdminRoute = memo(({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("AdminRoute - 인증 상태:", {
      user,
      loading,
      isAdmin: user ? isAdmin() : false,
      email: user?.email,
    });

    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading, user, isAdmin]);

  if (loading || !authChecked) {
    console.log("AdminRoute - 로딩 중...");
    return <SkeletonLoader />;
  }

  if (!user) {
    console.log("AdminRoute - 사용자가 없음, 로그인으로 리다이렉트");
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    console.log("AdminRoute - 관리자 아님, 메인으로 리다이렉트");
    return <Navigate to="/" replace />;
  }

  console.log("AdminRoute - 관리자 확인됨, 접근 허용");
  return children;
});

// 메모이제이션된 공개 전용 라우트 컴포넌트
const PublicOnlyRoute = memo(({ children }) => {
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (loading || !authChecked) {
    return <SkeletonLoader />;
  }

  if (user) {
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
  const { user } = useAuth();
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [manualShowModal, setManualShowModal] = useState(false);
  const [notices, setNotices] = useState([]);

  // 사용자 인증 상태 디버깅 로그 추가
  useEffect(() => {
    console.log("AppContent - 현재 사용자:", user);
    console.log("AppContent - 로컬 스토리지:", localStorage.getItem("user"));
  }, [user]);

  // 공지사항 데이터 불러오기 - useCallback으로 최적화
  const fetchNotices = useCallback(async () => {
    try {
      // 샘플 데이터
      const sampleNotices = [
        {
          id: 1,
          title: "3월 신규 강좌 개설 안내",
          content:
            "청라콩 문화센터의 새로운 강좌를 소개합니다! 전기이론, 우쿨렐레, 필라테스 수업이 새롭게 개설되었습니다. 각 분야의 전문 강사와 함께 즐거운 학습의 기회를 가져보세요. 지금 바로 수강 신청하세요!",
          date: "2025-03-15",
          urgent: true,
          link: "/services",
          imageUrl: [
            imageElecHan, // 전기이론 관련 이미지
            imageUkelelePos, // 우쿨렐레 관련 이미지
            imagePilatesPos, // 필라테스 관련 이미지
          ],
        },
        {
          id: 2,
          title: "청라콩 봄 음악회 개최 안내 - 4월 26일",
          content:
            "4월 26일, 청라콩 봄 음악회가 열립니다! 우리 학생들의 갈고닦은 실력을 직접 확인해보세요. 피아노, 바이올린, 성악 등 다양한 공연이 여러분을 기다리고 있습니다. 가족과 친구들과 함께 오셔서 특별한 음악의 순간을 만끽하세요.",
          date: "2025-03-14",
          urgent: false,
          link: "/about",
          imageUrl: [
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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

    // 로컬 스토리지에서 마지막으로 모달을 닫은 정보 확인
    const lastClosedData = localStorage.getItem("noticeModalLastClosed");

    if (lastClosedData) {
      try {
        // 새 형식의 데이터 파싱 시도
        const parsedData = JSON.parse(lastClosedData);

        // 새 형식의 데이터가 맞는지 확인 (hidden 속성이 있는지)
        if (parsedData && parsedData.hidden) {
          const now = new Date().getTime();

          // 만료 시간이 아직 지나지 않았다면 모달 표시하지 않음
          if (parsedData.expires && now < parsedData.expires) {
            console.log("모달 닫힘 상태가 아직 유효함");
            return false;
          }
        } else {
          // 이전 형식 (문자열) 데이터일 수 있음
          const today = new Date().toDateString();
          if (lastClosedData === today) {
            console.log("오늘 이미 모달 닫음 (이전 형식)");
            return false;
          }
        }
      } catch (error) {
        // 파싱 오류 - 이전 형식일 수 있음
        console.log("저장된 데이터 파싱 오류, 이전 형식 확인:", error);
        const today = new Date().toDateString();
        if (lastClosedData === today) {
          return false;
        }
      }
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

    // 새로운 형식으로 저장 - 오늘 하루 동안 보지 않기
    const today = new Date();
    const expires = new Date(today);
    expires.setHours(23, 59, 59, 999); // 오늘 자정까지

    localStorage.setItem(
      "noticeModalLastClosed",
      JSON.stringify({
        date: today.toDateString(),
        expires: expires.getTime(),
        noticeIds: notices.map((notice) => notice.id),
        hidden: true,
      })
    );
  }, [notices]);

  // 라우트 설정 - useMemo로 최적화
  const appRoutes = useMemo(
    () => (
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<Main />} />
        <Route
          path="/program/:id"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <ProgramDetail />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <Programs />
            </Suspense>
          }
        />
        <Route
          path="/contact/*"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <ContactBoard />
            </Suspense>
          }
        />
        <Route
          path="/video-lectures"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <VideoLectureBoard />
            </Suspense>
          }
        />
        <Route
          path="/ranking"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <ProgramRanking />
            </Suspense>
          }
        />
        <Route
          path="/music"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <FeaturedClasses />
            </Suspense>
          }
        />
        <Route
          path="/study-abroad"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <StudyAbroad />
            </Suspense>
          }
        />

        {/* 로그인한 사용자가 접근 불가한 라우트 */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Suspense fallback={<SkeletonLoader />}>
                <Login />
              </Suspense>
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Suspense fallback={<SkeletonLoader />}>
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
              <Suspense fallback={<SkeletonLoader />}>
                <MyPage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 관리자 전용 라우트 - FirebaseAdminDashboard로 변경 */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Suspense fallback={<SkeletonLoader />}>
                <AdminDashboard />
              </Suspense>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Suspense fallback={<SkeletonLoader />}>
                <AdminDashboard />
              </Suspense>
            </AdminRoute>
          }
        />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
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
    </>
  );
});

// 메인 App 컴포넌트 자체도 메모이제이션
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // AppContent를 조건부로 렌더링
  const renderAppContent = () => {
    if (isAdminRoute) {
      return <AdminDashboard />;
    }
    return <AppContent />;
  };

  return (
    <AuthProvider>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      {renderAppContent()}

      {!isAdminRoute && <Footer />}
    </AuthProvider>
  );
}
export default App;
