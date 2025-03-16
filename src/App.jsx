import React, { Suspense, lazy, useContext } from "react";
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

  return (
    <>
      <ScrollToTop />
      <Navbar />
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
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
