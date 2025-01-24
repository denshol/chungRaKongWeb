// Programs.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programs.css";
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
    duration: "12주",
    location: "서울 강남구",
    instructor: "홍길동",
    schedule: "매주 월, 수, 금 오후 7시",
  },
  {
    id: 2,
    title: "보컬 레슨",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: img2,
    duration: "8주",
    location: "서울 중구",
    instructor: "이순신",
    schedule: "매주 화, 목 오후 5시",
  },
  {
    id: 3,
    title: "음악 콘서트",
    description: "감동적인 선율과 특별한 공연의 순간",
    price: "무료",
    image: img3,
    duration: "2시간",
    location: "서울 예술의 전당",
    instructor: "김유신",
    schedule: "7월 10일 오후 4시",
  },
  {
    id: 4,
    title: "카혼 연주",
    description: "리듬의 마법을 체험해보세요!",
    price: "무료",
    image: img4,
    duration: "1시간",
    location: "서울 강서구",
    instructor: "유관순",
    schedule: "매주 화, 목 오후 3시",
  },
  {
    id: 5,
    title: "영어 회화 교실",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "무료",
    image: img5,
    duration: "8주",
    location: "서울 중구",
    instructor: "윤봉길",
    schedule: "매주 토 오전 10시",
  },
  {
    id: 6,
    title: "우쿨렐레 레슨",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: img6,
    duration: "4주",
    location: "서울 동대문구",
    instructor: "안중근",
    schedule: "매주 금 오후 6시",
  },
  {
    id: 7,
    title: "피아노 레슨",
    description: "전문가와 함께하는 피아노 레슨",
    price: "무료",
    image: img7,
    duration: "8주",
    location: "서울 서대문구",
    instructor: "유관순",
    schedule: "매주 화, 목 오후 6시",
  },
  {
    id: 8,
    title: "기타 레슨",
    description: "다양한 장르의 기타 연주를 배워보세요!",
    price: "무료",
    image: img8,
    duration: "8주",
    location: "서울 강남구",
    instructor: "홍길동",
    schedule: "매주 수, 금 오후 7시",
  },
  {
    id: 9,
    title: "밴드 연주",
    description: "밴드와 함께하는 즐거운 음악 세계",
    price: "무료",
    image: img9,
    duration: "12주",
    location: "서울 강북구",
    instructor: "김유신",
    schedule: "매주 토 오후 2시",
  },
  {
    id: 10,
    title: "합창단",
    description: "다함께 부르는 아름다운 합창곡",
    price: "무료",
    image: img10,
    duration: "12주",
    location: "서울 중랑구",
    instructor: "이순신",
    schedule: "매주 월, 수 오후 5시",
  },
  {
    id: 11,
    title: "베이스 레슨",
    description: "리듬과 멜로디를 연주하는 베이스 레슨",
    price: "무료",
    image: img11,
    duration: "8주",
    location: "서울 강동구",
    instructor: "황진이",
    schedule: "매주 화, 목 오후 4시",
  },
  {
    id: 12,
    title: "드럼 레슨",
    description: "타악기의 리듬을 익히는 드럼 레슨",
    price: "무료",
    image: img12,
    duration: "8주",
    location: "서울 송파구",
    instructor: "안중근",
    schedule: "매주 토 오후 3시",
  },
  {
    id: 13,
    title: "바이올린 레슨",
    description: "클래식과 현대 음악을 연주하는 바이올린 레슨",
    price: "무료",
    image: img13,
    duration: "8주",
    location: "서울 강서구",
    instructor: "윤봉길",
    schedule: "매주 수, 금 오후 5시",
  },
  {
    id: 14,
    title: "첼로 레슨",
    description: "클래식과 현대 음악을 연주하는 첼로 레슨",
    price: "무료",
    image: img14,
    duration: "8주",
    location: "서울 강남구",
    instructor: "김구",
    schedule: "매주 월, 수 오후 6시",
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

const Programs = () => {
  return (
    <div className="programs-container">
      <h1 className="programs-title">프로그램</h1>
      <div className="programs-grid">
        {programs.map((program) => (
          <Link
            to={`/program/${program.id}`}
            className="program-card"
            key={program.id}
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
              <div className="program-meta">
                <span>{program.duration}</span>
                <span>{program.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Programs;
