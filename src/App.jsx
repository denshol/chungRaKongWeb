// App.js 수정버전
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/styles.css";

const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./components/About"));
const Programs = lazy(() => import("./components/Programs")); // Programs 컴포넌트 확인

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSlider />
                  <ProgramList />
                </>
              }
            />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Programs />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
