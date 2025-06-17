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
import "./styles/main.css"; // 전역 CSS는 초기 로딩에 중요
import SkeletonLoader from "./components/SkeletonLoader";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NoticeModal from "./components/NoticeModal";
import SideNoticeBanner from "./components/SideNoticeBanner";

// ⚡️ LCP (Largest Contentful Paint) 개선을 위한 이미지 미리 로드
// 이 이미지들이 LCP에 포함될 가능성이 높다면, 여기서 명시적으로 미리 로드합니다.
// 실제 페이지의 LCP 요소를 확인하여 여기에 추가하세요.
import imageViolinPos from "./assets/image/programDetails/chungRaViolin.jpg";
import imageUkulelePos from "./assets/image/poster/chungRaUkelelePoster.jpg";
import imageCertificatePos from "./assets/image/poster/chungRaElecHan.jpg";

// ⚡️ 초기 렌더링에 핵심적인 컴포넌트들은 일반 임포트 (맨 위로 이동)
import Main from "./pages/Main";
import ScrollToTop from "./components/ScrollToTop";
import FindId from "./components/auth/FindId";
import FindPassword from "./components/auth/FindPassword";

// 🚀 중요하지만 즉시 필요 없는 컴포넌트들은 lazy 로드 (모두 맨 위로 이동)
const VideoLectureBoard = lazy(() => import("./pages/VideoLectureBoard"));
const FeaturedClasses = lazy(() => import("./components/FeaturedClasses"));
const FeaturedClasses2 = lazy(() => import("./components/FeaturedClasses2")); // 사용 여부 확인 필요, 불필요하면 제거
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ContactBoard = lazy(() => import("./components/ContactBoard"));
const StudyAbroad = lazy(() => import("./pages/StudyAbroad"));
const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const MyPage = lazy(() => import("./components/auth/MyPage"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));


// 이미지 미리 로드 실행 (브라우저 캐시에 저장하여 필요시 빠르게 사용)
// 이 부분은 import 문 아래에 위치해도 괜찮습니다.
new Image().src = imageViolinPos;
new Image().src = imageUkulelePos;
new Image().src = imageCertificatePos;


// 🔐 개선된 보호된 라우트 컴포넌트
const ProtectedRoute = memo(({ children }) => {
  const { user, loading } = useAuth();
  // 로딩 상태를 한 번만 확인하도록 최적화
  if (loading) {
    return <SkeletonLoader />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
});

// 👑 개선된 관리자 전용 라우트 컴포넌트
const AdminRoute = memo(({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <SkeletonLoader />;
  }

  // 사용자가 없거나 관리자가 아니면 리다이렉트
  if (!user || !isAdmin()) {
    // 디버깅 메시지는 실제 배포 시 제거
    if (!user) console.log("AdminRoute: 사용자 없음, 로그인으로 리다이렉트");
    else if (!isAdmin()) console.log("AdminRoute: 관리자 아님, 메인으로 리다이렉트");
    return <Navigate to={user ? "/" : "/login"} replace />;
  }

  return children;
});

// 🔓 메모이제이션된 공개 전용 라우트 컴포넌트
const PublicOnlyRoute = memo(({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <SkeletonLoader />;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
});

// 🌟 메모이제이션된 HeroSlider 조건부 렌더링 컴포넌트
const ConditionalHeroSlider = memo(() => {
  const location = useLocation();

  // useMemo로 제외 경로 최적화 및 안정화된 배열 사용
  const shouldRender = useMemo(() => {
    const exclusionPaths = new Set([
      "/about",
      "/login",
      "/register",
      "/mypage",
      "/admin",
      "/find-id",
      "/find-password",
      "/video-lectures", // 비디오 강의 페이지에서도 히어로 슬라이더가 필요 없을 수 있음
      "/music", // 특정 프로그램 페이지
      "/study-abroad", // 유학 프로그램 페이지
      "/contact", // 문의 페이지
      "/services", // 프로그램 목록 페이지
      // "/program", // 개별 프로그램 상세 페이지 (동적 라우트) - 아래에서 startsWith로 처리
    ]);
    // 동적 라우트 "/program/:id"에 대한 처리 추가
    if (location.pathname.startsWith("/program/")) return false;

    return !exclusionPaths.has(location.pathname);
  }, [location.pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    // HeroSlider 로딩 중에는 최소한의 공간을 확보하여 레이아웃 흔들림 방지
    <Suspense fallback={<div style={{ minHeight: "500px", background: "#f0f0f0" }}></div>}>
      <HeroSlider />
    </Suspense>
  );
});


// 📝 메인 앱 콘텐츠 메모이제이션 (성능 최적화의 핵심)
const AppContent = memo(() => {
  const { user } = useAuth();
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [manualShowModal, setManualShowModal] = useState(false);
  const [notices, setNotices] = useState([]);

  // 공지사항 데이터 불러오기 - useCallback으로 최적화 및 비동기 작업 처리
  const fetchNotices = useCallback(async () => {
    try {
      // 🚀 실제 API 호출로 변경 권장
      const sampleNotices = [
        {
          id: 1,
          title: "6월 바이올린 강좌 신규 모집 안내",
          content: "청라콩 문화센터의 바이올린 강좌가 신규모집을 시작했습니다! 전문 강사와 함께 즐거운 학습의 기회를 가져보세요. 지금 바로 수강 신청하세요!",
          date: "2025-06-07",
          urgent: true,
          link: "/services",
          imageUrl: imageViolinPos, // 직접 임포트된 이미지 사용
        },
        {
          id: 2,
          title: "신나는 우쿨렐레 강좌 개설! 함께 연주해요!",
          content: "청라콩 문화센터에서 신규 우쿨렐레 강좌를 오픈합니다. 쉽고 재미있게 악기를 배우고 싶은 분들께 완벽한 기회예요! 초보자도 환영합니다. 지금 바로 등록하세요!",
          date: "2025-06-17",
          urgent: true,
          link: "/services",
          imageUrl: imageUkulelePos, // 직접 임포트된 이미지 사용
        },
        {
          id: 3,
          title: "전기 자격증 취득 과정, 지금 바로 도전하세요!",
          content: "국가 공인 전기 자격증, 청라콩 문화센터에서 체계적으로 준비하세요! 이론부터 실전까지, 합격에 필요한 모든 것을 알려드립니다. 미래를 위한 투자를 시작하세요!",
          date: "2025-06-17",
          urgent: true,
          link: "/services",
          imageUrl: imageCertificatePos, // 직접 임포트된 이미지 사용
        },
      ];

      const sortedNotices = sampleNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotices(sortedNotices);

      const shouldShow = checkIfShouldShowModal(sortedNotices);
      setShowNoticeModal(shouldShow);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  }, []); // 의존성 배열 비움: 한 번만 실행

  // 모달을 표시해야 하는지 확인하는 함수 - useCallback으로 최적화
  const checkIfShouldShowModal = useCallback((noticeList) => {
    if (!noticeList || noticeList.length === 0) return false;

    const lastClosedData = localStorage.getItem("noticeModalLastClosed");
    if (lastClosedData) {
      try {
        const parsedData = JSON.parse(lastClosedData);
        if (parsedData && parsedData.hidden && parsedData.expires && new Date().getTime() < parsedData.expires) {
          return false; // 아직 숨김 유효
        }
      } catch (error) {
        console.error("Error parsing notice modal data from localStorage:", error);
      }
    }

    // 최신 공지사항이 3일 이내이거나 긴급 공지인 경우 모달 표시
    const latestNotice = noticeList[0];
    const noticeDate = new Date(latestNotice.date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    return noticeDate >= threeDaysAgo || latestNotice.urgent;
  }, []);

  // 컴포넌트 마운트 시 공지사항 불러오기 및 중요 컴포넌트 미리 로드
  useEffect(() => {
    fetchNotices();

    // 초기 로드 후 1초 후에 FeaturedClasses 및 FeaturedClasses2 미리 로드 (prefetching)
    // 이 컴포넌트들이 메인 페이지에서 즉시 보이지 않지만, 곧바로 사용될 가능성이 높을 때 유용합니다.
    const preloadTimer = setTimeout(() => {
      // import() 호출만으로 해당 청크를 가져오기 시작합니다.
      import("./components/FeaturedClasses");
      import("./components/FeaturedClasses2");
    }, 1000); // 메인 콘텐츠가 렌더링된 후 네트워크가 여유로울 때 시작

    return () => clearTimeout(preloadTimer);
  }, [fetchNotices]);

  // 배너 클릭 핸들러
  const handleBannerClick = useCallback(() => {
    setManualShowModal(true);
  }, []);

  // 모달 닫기 함수
  const closeNoticeModal = useCallback((hideForToday = false) => {
    setShowNoticeModal(false);
    setManualShowModal(false);

    if (hideForToday) {
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
    } else {
      localStorage.removeItem("noticeModalLastClosed");
    }
  }, [notices]);

  // 🔄 라우트 설정 - useMemo로 최적화
  // Routes와 Route 컴포넌트 자체는 고정적이므로 useMemo로 한 번만 생성
  const appRoutes = useMemo(
    () => (
      <Routes>
        {/* 공개 라우트 (SkeletonLoader는 Suspense fallback에서 처리) */}
        <Route path="/" element={<Main />} />
        <Route path="/program/:id" element={<Suspense fallback={<SkeletonLoader />}><ProgramDetail /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<SkeletonLoader />}><About /></Suspense>} />
        <Route path="/services" element={<Suspense fallback={<SkeletonLoader />}><Programs /></Suspense>} />
        <Route path="/contact/*" element={<Suspense fallback={<SkeletonLoader />}><ContactBoard /></Suspense>} />
        <Route path="/video-lectures" element={<Suspense fallback={<SkeletonLoader />}><VideoLectureBoard /></Suspense>} />
        <Route path="/music" element={<Suspense fallback={<SkeletonLoader />}><FeaturedClasses /></Suspense>} />
        <Route path="/study-abroad" element={<Suspense fallback={<SkeletonLoader />}><StudyAbroad /></Suspense>} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />

        {/* 로그인한 사용자가 접근 불가한 라우트 */}
        <Route path="/login" element={<PublicOnlyRoute><Suspense fallback={<SkeletonLoader />}><Login /></Suspense></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Suspense fallback={<SkeletonLoader />}><Register /></Suspense></PublicOnlyRoute>} />

        {/* 인증 필요 라우트 */}
        <Route path="/mypage" element={<ProtectedRoute><Suspense fallback={<SkeletonLoader />}><MyPage /></Suspense></ProtectedRoute>} />

        {/* 관리자 전용 라우트 */}
        {/* 관리자 라우트 보호는 AdminRoute 컴포넌트가 담당 */}
        <Route path="/admin/*" element={<AdminRoute><Suspense fallback={<SkeletonLoader />}><AdminDashboard /></Suspense></AdminRoute>} />

        {/* 404 페이지 - 라우트를 찾을 수 없을 때 메인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    ),
    [] // 라우트는 변경되지 않으므로 의존성 없음
  );

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* 사이드 공지사항 배너 - 공지사항이 있을 때만 렌더링 */}
      {notices.length > 0 && (
        <SideNoticeBanner
          onClick={handleBannerClick}
          noticeCount={notices.length}
        />
      )}

      {/* 공지사항 모달 - 필요할 때만 렌더링 */}
      {(showNoticeModal || manualShowModal) && notices.length > 0 && (
        <NoticeModal
          isOpen={true}
          notices={notices}
          onClose={closeNoticeModal}
        />
      )}

      {/* HeroSlider는 조건부 렌더링 컴포넌트로 분리하여 최적화 */}
      <ConditionalHeroSlider />

      {/* 모든 라우트를 담는 컨테이너 */}
      {appRoutes}

      <Footer />
    </>
  );
});

// 🚀 메인 App 컴포넌트 (AuthContext 제공 및 Admin 라우트 분기)
function App() {
  const location = useLocation();
  // 관리자 경로는 Navbar/Footer를 렌더링하지 않도록 분리
  const isAdminRoute = useMemo(() => location.pathname.startsWith("/admin"), [location.pathname]);

  return (
    <AuthProvider>
      {/* 관리자 라우트가 아니면 AppContent를 렌더링 */}
      {!isAdminRoute ? <AppContent /> : (
        // 관리자 라우트인 경우, AdminDashboard만 렌더링 (Navbar/Footer 없음)
        // AdminRoute 보호는 AdminDashboard 내부에서 처리되므로 여기서 따로 감싸지 않습니다.
        <Suspense fallback={<SkeletonLoader />}>
          <AdminDashboard />
        </Suspense>
      )}
    </AuthProvider>
  );
}

export default App;