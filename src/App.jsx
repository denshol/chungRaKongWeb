import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/main.css";
import VideoLectureBoard from "./pages/VideoLectureBoard";
import Register from "./pages/Register";
import FeaturedClasses from "./components/FeaturedClasses";
import FeaturedClasses2 from "./components/FeaturedClasses2";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthContext } from "./contexts/AuthContext"; // 사용자 상태 컨텍스트
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import ProgramRanking from "./components/ProgramRanking";

const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Login = lazy(() => import("./pages/Login"));
// 보호 라우트

function App() {
  // AuthContext를 통해 현재 사용자 정보를 가져옵니다.
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video-lectures" element={<VideoLectureBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ranking" element={<ProgramRanking />} />
          <Route path="/music" element={<FeaturedClasses />} />
          {/* 관리자 대시보드 보호 라우트 */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer /> {/* ✅ 하단 FeaturedClasses 삭제 */}
    </Router>
  );
}

export default App;
