// App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/styles.css";

// 지연 로딩 (Lazy Loading)
const HeroSlider = lazy(() => import("./components/HeroSlider"));
const ProgramList = lazy(() => import("./components/ProgramList"));
const ProgramDetail = lazy(() => import("./components/ProgramDetail"));
const About = lazy(() => import("./components/About"));

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<div>로딩 중...</div>}>
          <main>
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
            </Routes>
          </main>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
