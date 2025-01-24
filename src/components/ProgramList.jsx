import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/image/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaVocal.png";
import img3 from "../assets/image/concert3.jpg";
import img4 from "../assets/image/chungRaCajon.png";
import img5 from "../assets/image/chungRaEng.png";
import img6 from "../assets/image/chungRaUkulele.png";
import img7 from "../assets/image/chungRaPiano.png";
import img8 from "../assets/image/chungRaGuitar2.png";
import img9 from "../assets/image/chungRaBand2.png";
import img10 from "../assets/image/chungRaChorus.png";
import img11 from "../assets/image/chungRaBass.png";
import img12 from "../assets/image/chungRaDrum.png";
import img13 from "../assets/image/chungRaViolin.jpg";
import img14 from "../assets/image/chungRaCheloThumb.jpg";
import img15 from "../assets/image/chungRaElec2.png";
import img16 from "../assets/image/chungRaCoding.png";

const programs = [
  {
    id: 1,
    title: "필라테스",
    description: "체계적인 관리로 건강한 다이어트 실현!",
    price: "무료",
    image: img1,
  },
  {
    id: 2,
    title: "보컬",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: img2,
  },
  {
    id: 4,
    title: "카혼",
    description: "리듬의 마법을 체험해보세요!",
    price: "무료",
    image: img4,
  },
  {
    id: 5,
    title: "영어 회화",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "무료",
    image: img5,
  },
  {
    id: 6,
    title: "우쿨렐레",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: img6,
  },
  {
    id: 7,
    title: "피아노",
    description: "전문가와 함께하는 피아노 레슨",
    price: "무료",
    image: img7,
  },
  {
    id: 8,
    title: "통기타",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img8,
  },
  {
    id: 9,
    title: "밴드",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "무료",
    image: img9,
  },
  {
    id: 10,
    title: "합창",
    description: "다함께 노래하는 즐거운 합창 시간",
    price: "무료",
    image: img10,
  },
  {
    id: 11,
    title: "베이스",
    description: "베이스의 리듬에 맞춰보세요!",
    price: "무료",
    image: img11,
  },
  {
    id: 12,
    title: "드럼",
    description: "드럼의 리듬과 템포를 익혀보세요!",
    price: "무료",
    image: img12,
  },
  {
    id: 13,
    title: "바이올린",
    description: "클래식 음악의 선율을 만나보세요!",
    price: "무료",
    image: img13,
  },
  {
    id: 14,
    title: "첼로",
    description: "첼로의 감미로운 소리를 배워보세요!",
    price: "무료",
    image: img14,
  },
  {
    id: 15,
    title: "일렉기타",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img15,
  },
  {
    id: 16,
    title: "코딩",
    description: "코딩의 기초부터 심화까지 배울 수 있는 프로그램",
    price: "무료",
    image: img16,
  },
];

const ProgramList = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 프로그램 클릭 핸들러
  const handleProgramClick = (programId) => {
    if (!isDragging) {
      navigate(`/program/${programId}`);
    }
  };

  // 좌우 버튼 클릭 핸들러
  const scrollLeftHandler = () => {
    const cardWidth = 280; // 카드 하나의 너비 + margin
    const visibleCards = 4; // 한 번에 보여줄 카드 수
    sliderRef.current.scrollBy({
      left: -(cardWidth * visibleCards),
      behavior: "smooth",
    });
  };

  const scrollRightHandler = () => {
    const cardWidth = 280;
    const visibleCards = 4;
    sliderRef.current.scrollBy({
      left: cardWidth * visibleCards,
      behavior: "smooth",
    });
  };

  // 드래그 시작 핸들러
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // 드래그 동작 핸들러
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조정
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료 핸들러
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="program-slider-container">
      <button className="arrow left" onClick={scrollLeftHandler}>
        ❮
      </button>
      <button className="arrow right" onClick={scrollRightHandler}>
        ❯
      </button>
      <div
        className="program-list"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
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
