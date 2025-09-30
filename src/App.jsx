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
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// 이미지 미리 로드
import imageViolinPos from "./assets/image/programDetails/chungRaViolin.jpg";
import imageUkulelePos from "./assets/image/poster/chungRaUkelelePoster.jpg";
import imageCertificatePos from "./assets/image/poster/chungRaElecHan.jpg";

// 초기 렌더링에 핵심적인 컴포넌트들
import Main from "./pages/Main";
import ScrollToTop from "./components/ScrollToTop";
import FindId from "./components/auth/FindId";
import FindPassword from "./components/auth/FindPassword";

// Lazy 로드 컴포넌트들
const VideoLectureBoard = lazy(() => import("./pages/VideoLectureBoard"));
const FeaturedClasses = lazy(() => import("./components/FeaturedClasses"));
const FeaturedClasses2 = lazy(() => import("./components/FeaturedClasses2"));
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

// 이미지 미리 로드 실행
new Image().src = imageViolinPos;
new Image().src = imageUkulelePos;
new Image().src = imageCertificatePos;

// 보호된 라우트 컴포넌트
const ProtectedRoute = memo(({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <SkeletonLoader />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
});

// 관리자 전용 라우트 컴포넌트
const AdminRoute = memo(({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!user || !isAdmin()) {
    if (!user) console.log("AdminRoute: 사용자 없음, 로그인으로 리다이렉트");
    else if (!isAdmin()) console.log("AdminRoute: 관리자 아님, 메인으로 리다이렉트");
    return <Navigate to={user ? "/" : "/login"} replace />;
  }

  return children;
});

// 공개 전용 라우트 컴포넌트
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

// HeroSlider 조건부 렌더링 컴포넌트
const ConditionalHeroSlider = memo(() => {
  const location = useLocation();

  const shouldRender = useMemo(() => {
    const exclusionPaths = new Set([
      "/about",
      "/login",
      "/register",
      "/mypage",
      "/admin",
      "/find-id",
      "/find-password",
      "/video-lectures",
      "/music",
      "/study-abroad",
      "/contact",
      "/services",
    ]);
    
    if (location.pathname.startsWith("/program/")) return false;

    return !exclusionPaths.has(location.pathname);
  }, [location.pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Suspense fallback={<div style={{ minHeight: "500px", background: "#f0f0f0" }}></div>}>
      <HeroSlider />
    </Suspense>
  );
});

// 메인 앱 콘텐츠
const AppContent = memo(() => {
  const { user } = useAuth();

  // 컴포넌트 마운트 시 중요 컴포넌트 미리 로드
  useEffect(() => {
    const preloadTimer = setTimeout(() => {
      import("./components/FeaturedClasses");
      import("./components/FeaturedClasses2");
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, []);

  // 라우트 설정
  const appRoutes = useMemo(
    () => (
      <Routes>
        {/* 공개 라우트 */}
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
        <Route path="/admin/*" element={<AdminRoute><Suspense fallback={<SkeletonLoader />}><AdminDashboard /></Suspense></AdminRoute>} />

        {/* 404 페이지 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    ),
    []
  );

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* HeroSlider 조건부 렌더링 */}
      <ConditionalHeroSlider />

      {/* 모든 라우트 */}
      {appRoutes}

      <Footer />
    </>
  );
});

// 메인 App 컴포넌트
function App() {
  const location = useLocation();
  const isAdminRoute = useMemo(() => location.pathname.startsWith("/admin"), [location.pathname]);

  return (
    <AuthProvider>
      {!isAdminRoute ? <AppContent /> : (
        <Suspense fallback={<SkeletonLoader />}>
          <AdminDashboard />
        </Suspense>
      )}
    </AuthProvider>
  );
}

export default App;