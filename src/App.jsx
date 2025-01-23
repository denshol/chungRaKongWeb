import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import ProgramList from "./components/ProgramList";
import ProgramDetail from "./components/ProgramDetail";
import Footer from "./components/Footer";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
