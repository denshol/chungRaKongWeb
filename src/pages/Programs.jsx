// src/pages/Programs.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programs.module.css";

// 📂 programImages 폴더에서 가져오기
import imgBand from "../assets/image/programImages/chungRaBand2.png";
import imgBass from "../assets/image/programImages/chungRaBass.png";
import imgCajon from "../assets/image/programImages/chungRaCajon.png";
import imgChorus from "../assets/image/programImages/chungRaChorus.png";
import imgCoding from "../assets/image/programImages/chungRaCoding.png";
import imgDrum from "../assets/image/programImages/chungRaDrum.png";
import imgEng from "../assets/image/programDetails/chungRaEng.png";
import imgElec from "../assets/image/programImages/chungRaElec2.png";
import imgGuitar from "../assets/image/programDetails/chungRaGuitar2.png";
import imgPiano from "../assets/image/programImages/chungRaPiano.png";
import imgPilates from "../assets/image/programDetails/PilatesTeacher2.jpg";
import imgUkulele from "../assets/image/programImages/chungRaUkulele.png";
import imgVocal from "../assets/image/programImages/chungRaVocal.png";

// 📂 programDetails 폴더에서 가져오기
import imgViolin from "../assets/image/programDetails/chungRaViolin.jpg";
import imgChelo from "../assets/image/programDetails/chungRaCheloThumb.jpg";

const programs = [
  { id: 1, title: "필라테스", description: "전문가와 함께하는 필라테스 수업", price: "무료", image: imgPilates },
  { id: 2, title: "보컬", description: "전문가와 함께하는 보컬 레슨", price: "무료", image: imgVocal },
  { id: 3, title: "카혼", description: "리듬의 마법을 체험해보세요!", price: "무료", image: imgCajon },
  { id: 4, title: "바이올린", description: "클래식 음악의 선율을 만나보세요!", price: "무료", image: imgViolin },
  { id: 5, title: "첼로", description: "첼로의 감미로운 소리를 배워보세요!", price: "무료", image: imgChelo },
  { id: 6, title: "통기타", description: "다양한 장르의 기타 연주를 배워보세요!", price: "무료", image: imgGuitar },
  { id: 7, title: "드럼", description: "타악기의 리듬을 익히는 드럼 레슨", price: "무료", image: imgDrum },
  { id: 8, title: "피아노", description: "전문가와 함께하는 피아노 레슨", price: "무료", image: imgPiano },
  { id: 9, title: "영어 회화", description: "실전에서 바로 쓰는 영어회화!", price: "무료", image: imgEng },
  { id: 10, title: "일렉기타", description: "일렉기타의 다양한 소리를 만나보세요!", price: "무료", image: imgElec },
  { id: 11, title: "우쿨렐레", description: "우쿨렐레의 매력에 빠져보세요!", price: "무료", image: imgUkulele },
  { id: 12, title: "밴드", description: "밴드와 함께하는 즐거운 음악 세계", price: "무료", image: imgBand },
  { id: 13, title: "베이스", description: "리듬과 멜로디를 연주하는 베이스 레슨", price: "무료", image: imgBass },
  { id: 14, title: "코딩", description: "코딩의 기초부터 심화까지 배울 수 있는 프로그램", price: "무료", image: imgCoding },
  { id: 15, title: "합창", description: "다함께 부르는 아름다운 합창곡", price: "무료", image: imgChorus },
];

const Programs = () => {
  return (
    <div className="programs-container">
      <h1 className="programs-title">Program</h1>
      <div className="programs-grid">
        {programs.map((program) => (
          <Link to={`/program/${program.id}`} className="program-card" key={program.id}>
            <div className="program-image-container">
              <img src={program.image} alt={program.title} loading="lazy" width="300" height="200" />
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
};

export default Programs;
