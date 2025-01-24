import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/image/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaVocal.png";
import img3 from "../assets/image/concert3.jpg";
import img4 from "../assets/image/chungRaCajon.png";
import img5 from "../assets/image/chungRaEng.png";
import img6 from "../assets/image/chungRaUkulele.png";
import img7 from "../assets/image/chungRaPiano.png";
import img8 from "../assets/image/chungRaGuitar2.png";
import img9 from "../assets/image/chungRaBand.jpg";
import img10 from "../assets/image/chungRaChorus.jpg";
import img11 from "../assets/image/chungRaBass.png";
import img12 from "../assets/image/chungRaDrum.png";
import img13 from "../assets/image/chungRaViolin.jpg";
import img14 from "../assets/image/chungRaCheloThumb.jpg";
import img15 from "../assets/image/chungRaElec.png";

const programs = [
  {
    id: 1,
    title: "리즈갱신 다이어트 챌린지",
    description: "체계적인 관리로 건강한 다이어트 실현!",
    price: "무료",
    image: img1,
  },
  {
    id: 2,
    title: "보컬 레슨",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: img2,
  },
  {
    id: 3,
    title: "음악 콘서트",
    description: "감동적인 선율과 특별한 공연의 순간",
    price: "무료",
    image: img3,
  },
  {
    id: 4,
    title: "카혼 연주",
    description: "리듬의 마법을 체험해보세요!",
    price: "무료",
    image: img4,
  },
  {
    id: 5,
    title: "영어 회화 교실",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "무료",
    image: img5,
  },
  {
    id: 6,
    title: "우쿨렐레 레슨",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: img6,
  },
  {
    id: 7,
    title: "피아노 레슨",
    description: "전문가와 함께하는 피아노 레슨",
    price: "무료",
    image: img7,
  },
  {
    id: 8,
    title: "기타 레슨",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img8,
  },
  {
    id: 9,
    title: "밴드 연주",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "무료",
    image: img9,
  },
  {
    id: 10,
    title: "합창단",
    description: "다함께 노래하는 즐거운 합창 시간",
    price: "무료",
    image: img10,
  },
  {
    id: 11,
    title: "베이스 레슨",
    description: "베이스의 리듬에 맞춰보세요!",
    price: "무료",
    image: img11,
  },
  {
    id: 12,
    title: "드럼 레슨",
    description: "드럼의 리듬과 템포를 익혀보세요!",
    price: "무료",
    image: img12,
  },
  {
    id: 13,
    title: "바이올린 레슨",
    description: "클래식 음악의 선율을 만나보세요!",
    price: "무료",
    image: img13,
  },
  {
    id: 14,
    title: "첼로 레슨",
    description: "첼로의 감미로운 소리를 배워보세요!",
    price: "무료",
    image: img14,
  },
  {
    id: 15,
    title: "일렉기타 레슨",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img15,
    duration: "1시간",
    location: "서울 강남구",
    instructor: "황진이",
    schedule: "매주 일요일 오후 3시",
  },
];

const ProgramList = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleProgramClick = (programId) => {
    navigate(`/program/${programId}`);
  };

  const scrollLeftHandler = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="program-slider-container">
      <button className="arrow left" onClick={scrollLeftHandler}>
        ❮
      </button>
      <button className="arrow right" onClick={scrollRightHandler}>
        ❯
      </button>
      <div className="program-list" ref={sliderRef}>
        {programs.map((program) => (
          <div
            key={program.id}
            className="program-card"
            onClick={() => handleProgramClick(program.id)}
          >
            <img src={program.image} alt={program.title} loading="lazy" />
            <div className="program-card-content">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <span>{program.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProgramList);
