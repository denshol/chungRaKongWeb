import React, { useState, useRef, useEffect } from "react";
import img1 from "../assets/image/PilatesTeacher2.jpg";
import img2 from "../assets/image/chungRaFestival.jpg";
import img3 from "../assets/image/concert3.jpg";
import img4 from "../assets/image/chungRaCajon.jpg";
import img5 from "../assets/image/chungRaEng.png";
import img6 from "../assets/image/chungRaUkulele.jpg";
import img7 from "../assets/image/chungRaPiano.jpg";
import img8 from "../assets/image/chungRaGuitar4.jpg";
import img9 from "../assets/image/chungRaBand.jpg";
import img10 from "../assets/image/chungRaChorus.jpg";
import img11 from "../assets/image/chungRaBass.jpg";
import img12 from "../assets/image/chungRaDrumThumb.jpg";
import img13 from "../assets/image/chungRaViolin.jpg";
import img14 from "../assets/image/chungRaCheloThumb.jpg";
import { useNavigate } from "react-router-dom";

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
    title: "청라콩 축제",
    description: "커뮤니티와 함께하는 특별한 축제 현장",
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
];

const ProgramList = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsDragging(false), 50); // 클릭 이벤트와 충돌 방지
  };

  const handleProgramClick = (programId) => {
    if (isDragging) return; // 드래그 중 클릭 차단
    navigate(`/program/${programId}`);
  };

  const scrollLeftHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);

    return () => {
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mousemove", handleMouseMove);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [isDragging]);

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
            <img src={program.image} alt={program.title} />
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

export default ProgramList;
