import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programs.css";

const programs = [
  {
    id: 1,
    title: "AI 로고 디자인 노하우",
    price: "29,000원",
    type: "전자책",
    image: "..assets/images/chungRaKong.png",
  },
  {
    id: 2,
    title: "스타트업의 브랜드병 이기는 법",
    price: "월 3,334원",
    type: "VOD",
    image: "/images/branding.png",
  },
  {
    id: 3,
    title: "부수입 파이프라인 만들기",
    price: "26,000원",
    type: "전자책",
    image: "/images/pipeline.png",
  },
];

const Programs = () => {
  return (
    <div className="program-list">
      <h2>프로그램 목록</h2>
      <div className="program-grid">
        {programs.map((program) => (
          <div className="program-card" key={program.id}>
            <img
              src={program.image}
              alt={program.title}
              className="program-image"
            />
            <h3>{program.title}</h3>
            <p>{program.price}</p>
            <Link to={`/program/${program.id}`} className="details-link">
              자세히 보기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
