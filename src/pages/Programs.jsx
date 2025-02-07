import React from "react";
import { Link } from "react-router-dom";
import "../styles/Programs.module.css";

// 리스트 페이지용 이미지 (썸네일)
import imgBand from "../assets/image/programImages/chungRaBand2.png";
import imgBass from "../assets/image/programImages/chungRaBass.png";
import imgCajon from "../assets/image/programImages/chungRaCajon.png";
import imgChorus from "../assets/image/programImages/chungRaChorus.png";
import imgCoding from "../assets/image/programImages/chungRaCoding.png";
import imgDrum from "../assets/image/programImages/chungRaDrum.png";
import imgEng from "../assets/image/programDetails/chungRaEng.png";
import imgElec from "../assets/image/programImages/chungRaElec2.png";
import imgGuitar from "../assets/image/programImages/chungRaGuitar4.jpg";
import imgPiano from "../assets/image/programImages/chungRaPiano.png";
import imgPilates from "../assets/image/programDetails/PilatesTeacher2.jpg";
import imgUkulele from "../assets/image/programImages/chungRaUkulele.png";
import imgVocal from "../assets/image/programImages/chungRaVocal.png";
import imgViolin from "../assets/image/programDetails/chungRaViolin.jpg";
import imgChelo from "../assets/image/programDetails/chungRaCheloThumb.jpg";

// 상세 페이지용 이미지 (큰 이미지)
import detailBand from "../assets/image/programDetails/chungRaBand.jpg";
import detailBass from "../assets/image/programDetails/chungRaBass.jpg";
import detailCajon from "../assets/image/programDetails/chungRaCajon.jpg";
import detailChorus from "../assets/image/programDetails/chungRaChorus.jpg";
import detailCoding from "../assets/image/programImages/chungRaCoding.png";
import detailDrum from "../assets/image/poster/chungRaDrumPos.png";
import detailEng from "../assets/image/programDetails/chungRaEng.png";
import detailElec from "../assets/image/poster/chungRaElecPos.jpg";
import detailGuitar from "../assets/image/programDetails/chungRaGuitar2.png";
import detailPiano from "../assets/image/programDetails/chungRaPiano.jpg";
import detailPilates from "../assets/image/programImages/chungRaPilates.jpg";
import detailUkulele from "../assets/image/programDetails/chungRaUkulele.jpg";
import detailVocal from "../assets/image/poster/chungRaVocalPos.jpg";
import detailViolin from "../assets/image/programDetails/chungRaViolin.jpg";
import detailChelo from "../assets/image/programDetails/chungRaCheloThumb.jpg";

export const programs = [
  {
    id: 1,
    title: "필라테스",
    description: "체계적인 관리로 건강한 다이어트 실현!",
    price: "무료",
    image: imgPilates,
    detailImage: detailPilates,
    location: "인천 청라동",
    schedule: "매주 금요일 16시",
  },
  {
    id: 2,
    title: "보컬",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: imgVocal,
    detailImage: detailVocal,
    location: "인천 청라동",
    schedule: "매주 월요일 18~20시, 화요일 18~20시, 토요일 11시",
  },
  {
    id: 3,
    title: "카혼",
    description: "리듬의 마법을 체험해보세요!",
    price: "무료",
    image: imgCajon,
    detailImage: detailCajon,
    location: "인천 청라동",
    schedule: "시간협의",
  },
  {
    id: 4,
    title: "바이올린",
    description: "클래식과 현대 음악을 연주해요!",
    price: "무료",
    image: imgViolin,
    detailImage: detailViolin,
    location: "인천 청라동",
    schedule: "매주 토요일 12시30분",
  },
  {
    id: 5,
    title: "첼로",
    description: "클래식 음악의 아름다움을 느껴요!",
    price: "무료",
    image: imgChelo,
    detailImage: detailChelo,
    location: "인천 청라동",
    schedule: "매주 토요일 13시30분",
  },
  {
    id: 6,
    title: "통기타",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: imgGuitar,
    detailImage: detailGuitar,
    location: "인천 청라동",
    schedule: "매주 토요일 오전 10시",
  },
  {
    id: 7,
    title: "드럼",
    description: "드럼의 강렬한 비트를 연습해요!",
    price: "무료",
    image: imgDrum,
    detailImage: detailDrum,
    location: "인천 청라동",
    schedule: "매주 수요일 19~20시, 목 18시",
  },
  {
    id: 8,
    title: "피아노",
    description: "클래식과 팝송을 함께 연주해요!",
    price: "무료",
    image: imgPiano,
    detailImage: detailPiano,
    location: "인천 청라동",
    schedule: "매주 토요일 20시",
  },
  {
    id: 9,
    title: "영어 회화",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "무료",
    image: imgEng,
    detailImage: detailEng,
    location: "인천 청라동",
    schedule: "매주 토요일 15~17시",
  },
  {
    id: 10,
    title: "일렉기타",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: imgElec,
    detailImage: detailElec,
    location: "인천 청라동",
    schedule: "매주 목요일 19시",
  },
  {
    id: 11,
    title: "우쿨렐레",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: imgUkulele,
    detailImage: detailUkulele,
    location: "인천 청라동",
    schedule: "시간협의",
  },
  {
    id: 12,
    title: "밴드",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "무료",
    image: imgBand,
    detailImage: detailBand,
    location: "인천 청라동",
    schedule: "매주 토요일 14시",
  },
  {
    id: 13,
    title: "베이스",
    description: "베이스의 리듬과 멜로디를 연습해요!",
    price: "무료",
    image: imgBass,
    detailImage: detailBass,
    location: "인천 청라동",
    schedule: "매주 목요일 18시",
  },
  {
    id: 14,
    title: "코딩",
    description: "코딩의 기초부터 심화까지 배울 수 있는 프로그램",
    price: "무료",
    image: imgCoding,
    detailImage: detailCoding,
    location: "인천 청라동",
    schedule: "매주 토요일 16시",
  },
  {
    id: 15,
    title: "합창",
    description: "다함께 노래하는 즐거운 시간",
    price: "무료",
    image: imgChorus,
    detailImage: detailChorus,
    location: "인천 청라동",
    schedule: "매주 토요일 19시",
  },
];

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
