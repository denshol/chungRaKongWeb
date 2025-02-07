import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programs.module.css";
import { programs } from "../data/programs";

const Programs = React.memo(() => {
  return (
    <div className="programs-container">
      <h1 className="programs-title">Program</h1>
      <div className="programs-grid">
        {programs.map((program) => (
          <Link
            to={`/program/${program.id}`}
            className="program-card"
            key={program.id}
            onClick={() => window.scrollTo(0, 0)} // 클릭 시 페이지 상단으로 스크롤
          >
            <div className="program-image-container">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                width="300"
                height="200"
              />
              <div className="program-badge">{program.price}</div>
            </div>
            <div className="program-content">
              <h3 className="program-title">{program.title}</h3>
              <p className="program-description">{program.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default Programs;
