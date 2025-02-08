// src/data/programs.js

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
import imgElectric from "../assets/image/programDetails/chungRaElectric.jpg";
import imgPhysical from "../assets/image/programDetails/chungRaPhysical.jpg";

// 상세 이미지 임포트
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

export const CATEGORIES = {
  MUSIC: "음악",
  EDUCATION: "교육",
  HEALTH: "건강",
  TECHNICAL: "기술",
};

export const FEATURED_IDS = [6, 7, 13, 10, 3, 15, 12, 8];

export const programs = [
  {
    id: 6,
    category: CATEGORIES.MUSIC,
    title: "통기타",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: imgGuitar,
    detailImage: detailGuitar,
    location: "인천 청라동",
    schedule: "매주 토요일 오전 10시",
    isFeatured: true,
  },
  {
    id: 7,
    category: CATEGORIES.MUSIC,
    title: "드럼",
    description: "드럼의 강렬한 비트를 연습해요!",
    price: "무료",
    image: imgDrum,
    detailImage: detailDrum,
    location: "인천 청라동",
    schedule: "매주 수요일 19~20시, 목 18시",
    isFeatured: true,
  },
  {
    id: 8,
    category: CATEGORIES.MUSIC,
    title: "피아노",
    description: "클래식과 팝송을 함께 연주해요!",
    price: "무료",
    image: imgPiano,
    detailImage: detailPiano,
    location: "인천 청라동",
    schedule: "매주 토요일 20시",
    isFeatured: true,
  },
  {
    id: 10,
    category: CATEGORIES.MUSIC,
    title: "일렉기타",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: imgElec,
    detailImage: detailElec,
    location: "인천 청라동",
    schedule: "매주 목요일 19시",
    isFeatured: true,
  },
  {
    id: 13,
    category: CATEGORIES.MUSIC,
    title: "베이스",
    description: "베이스의 리듬과 멜로디를 연습해요!",
    price: "무료",
    image: imgBass,
    detailImage: detailBass,
    location: "인천 청라동",
    schedule: "매주 목요일 18시",
    isFeatured: true,
  },
  {
    id: 11,
    category: CATEGORIES.MUSIC,
    title: "우쿨렐레",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: imgUkulele,
    detailImage: detailUkulele,
    location: "인천 청라동",
    schedule: "시간협의",
  },
  {
    id: 3,
    category: CATEGORIES.MUSIC,
    title: "카혼",
    description: "리듬의 마법을 체험해보세요!",
    price: "무료",
    image: imgCajon,
    detailImage: detailCajon,
    location: "인천 청라동",
    schedule: "시간협의",
    isFeatured: true,
  },
  {
    id: 4,
    category: CATEGORIES.MUSIC,
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
    category: CATEGORIES.MUSIC,
    title: "첼로",
    description: "클래식 음악의 아름다움을 느껴요!",
    price: "무료",
    image: imgChelo,
    detailImage: detailChelo,
    location: "인천 청라동",
    schedule: "매주 토요일 13시30분",
  },
  {
    id: 12,
    category: CATEGORIES.MUSIC,
    title: "밴드",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "무료",
    image: imgBand,
    detailImage: detailBand,
    location: "인천 청라동",
    schedule: "매주 토요일 14시",
    isFeatured: true,
  },
  {
    id: 2,
    category: CATEGORIES.MUSIC,
    title: "보컬",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: imgVocal,
    detailImage: detailVocal,
    location: "인천 청라동",
    schedule: "매주 월요일 18~20시, 화요일 18~20시, 토요일 11시",
  },
  {
    id: 9,
    category: CATEGORIES.EDUCATION,
    title: "영어 회화",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "무료",
    image: imgEng,
    detailImage: detailEng,
    location: "인천 청라동",
    schedule: "매주 토요일 15~17시",
  },
  {
    id: 14,
    category: CATEGORIES.EDUCATION,
    title: "코딩",
    description: "코딩의 기초부터 심화까지 배울 수 있는 프로그램",
    price: "무료",
    image: imgCoding,
    detailImage: detailCoding,
    location: "인천 청라동",
    schedule: "매주 토요일 16시",
  },
  {
    id: 1,
    category: CATEGORIES.HEALTH,
    title: "필라테스",
    description: "체계적인 관리로 건강한 다이어트 실현!",
    price: "무료",
    image: imgPilates,
    detailImage: detailPilates,
    location: "인천 청라동",
    schedule: "매주 금요일 16시",
  },
  {
    id: 16,
    category: CATEGORIES.TECHNICAL,
    title: "전기이론 마스터 클래스",
    description: "기초부터 심화까지 체계적인 전기이론 학습과정",
    price: "무료",
    image: imgElectric,
    detailImage: imgElectric,
    location: "전기이론",
    schedule: "주 1회 / 90분",
    instructor: "한찬호 강사",
    details: [
      "전기의 기본 원리와 법칙",
      "회로 설계 및 분석",
      "전기 안전과 실무 응용",
      "자격증 취득 준비",
    ],
    isFeatured: false,
  },
  {
    id: 17,
    category: CATEGORIES.HEALTH,
    title: "물리치료 실습",
    description: "실전 중심의 물리치료 실습 교육 프로그램",
    price: "1개월무료",
    image: imgPhysical,
    detailImage: imgPhysical,
    location: "청라콩 ",
    schedule: "120분",
    instructor: "김의한 강사",
    details: [
      "근골격계 치료 실습",
      "전기치료 및 운동치료",
      "재활운동 프로그램",
      "임상 케이스 스터디",
    ],
    isFeatured: false,
  },
];

export const getProgramsByCategory = (category) =>
  programs.filter((program) => program.category === category);

export const getFeaturedPrograms = () =>
  programs.filter((program) => FEATURED_IDS.includes(program.id));

export const getMusicPrograms = () =>
  programs.filter((program) => program.category === CATEGORIES.MUSIC);

export const searchPrograms = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return programs.filter(
    (program) =>
      program.title.toLowerCase().includes(lowercaseQuery) ||
      program.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRandomFeaturedPrograms = (count = 4) => {
  const featured = getFeaturedPrograms();
  return [...featured].sort(() => Math.random() - 0.5).slice(0, count);
};
