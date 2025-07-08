import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Programs.module.css";

import img1 from "../assets/image/programDetails/PilatesTeacher2.jpg";
import img2 from "../assets/image/programImages/chungRaVocal.png";
import img4 from "../assets/image/programImages/chungRaCajon.png";
import img5 from "../assets/image/programDetails/chungRaEng.png";
import img6 from "../assets/image/programImages/chungRaUkulele.png";
import img7 from "../assets/image/programImages/chungRaPiano.png";
import img8 from "../assets/image/programDetails/chungRaGuitar2.png";
import img9 from "../assets/image/programImages/chungRaBand2.png";
import img10 from "../assets/image/programImages/chungRaChorus.png";
import img11 from "../assets/image/programImages/chungRaBass.png";
import img12 from "../assets/image/programImages/chungRaDrum.png";
import img13 from "../assets/image/programDetails/chungRaViolin.jpg";
import img14 from "../assets/image/programDetails/chungRaCheloThumb.jpg";
import img15 from "../assets/image/programImages/chungRaElec2.png";
import img16 from "../assets/image/programImages/chungRaCoding.png";
import img17 from "../assets/image/programImages/chungRaworship.jpg";



const programs = [
  {
    id: 1,
    title: "필라테스",
    description: "건강한 다이어트!",
    price: "무료",
    image: img1,
  },
  {
    id: 2,
    title: "보컬",
    description: "보컬 레슨",
    price: "무료",
    image: img2,
  },
  {
    id: 4,
    title: "카혼",
    description: "리듬의 마법",
    price: "무료",
    image: img4,
  },
  {
    id: 5,
    title: "영어 회화",
    description: "실전 영어",
    price: "무료",
    image: img5,
  },
  {
    id: 6,
    title: "우쿨렐레",
    description: "우쿨렐레 연주",
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
    description: "기타 연주를 배워보세요!",
    price: "무료",
    image: img8,
  },
  {
    id: 9,
    title: "밴드",
    description: "밴드와 함께 연주",
    price: "무료",
    image: img9,
  },
  {
    id: 10,
    title: "합창",
    description: "함께 부르는 합창",
    price: "무료",
    image: img10,
  },
  {
    id: 11,
    title: "베이스",
    description: "리듬을 배우는 베이스 레슨",
    price: "무료",
    image: img11,
  },
  {
    id: 12,
    title: "드럼",
    description: "드럼 연주 배우기",
    price: "무료",
    image: img12,
  },
  {
    id: 13,
    title: "바이올린",
    description: "클래식 음악 연주",
    price: "무료",
    image: img13,
  },
  {
    id: 14,
    title: "첼로",
    description: "첼로 연주 배우기",
    price: "무료",
    image: img14,
  },
  {
    id: 15,
    title: "일렉기타",
    description: "일렉기타 연주",
    price: "무료",
    image: img15,
  },
  {
    id: 16,
    title: "코딩",
    description: "코딩 기초부터 심화까지",
    price: "무료",
    image: img16,
  },
];

const ProgramList = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const container = sliderRef.current;
    const cardWidth = 320; // 카드 width + gap
    const containerWidth = container.clientWidth;
    const scrollAmount = Math.floor(containerWidth / cardWidth) * cardWidth;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.programSliderContainer}>
      <button
        className={`${styles.scrollButton} ${styles.prevButton}`}
        onClick={() => handleScroll("prev")}
      >
        &#8249;
      </button>

      <div className={styles.programList} ref={sliderRef}>
        {programs.map((program) => (
          <div
            key={program.id}
            className={styles.programCard}
            onClick={() => navigate(`/program/${program.id}`)}
          >
            <img src={program.image} alt={program.title} loading="lazy" />
            <div className={styles.programCardContent}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <span>{program.price}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.scrollButton} ${styles.nextButton}`}
        onClick={() => handleScroll("next")}
      >
        &#8250;
      </button>
    </div>
  );
};

export default React.memo(ProgramList);
