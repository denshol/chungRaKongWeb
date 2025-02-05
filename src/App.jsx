import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/main.css";
import VideoLectureBoard from "./pages/VideoLectureBoard";
import Register from "./pages/Register";
import FeaturedClasses from "./components/FeaturedClasses";
import FeaturedClasses2 from "./components/FeaturedClasses2";

const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider />
                <ProgramList />
                <FeaturedClasses />  {/* ✅ 여기서만 사용! */}
                <FeaturedClasses2 />
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
        </Routes>
      </Suspense>
      <Footer />  {/* ✅ 하단 FeaturedClasses 삭제 */}
    </Router>
  );
}


export default App;
