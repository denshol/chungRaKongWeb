import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    title: "청라콩 축제",
    description: "커뮤니티와 함께하는 특별한 축제 현장",
    price: "무료",
    image: img2,
    duration: "1일",
    location: "청라 중앙공원",
    instructor: "이순신",
    schedule: "6월 15일 오후 2시",
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
    duration: "1시간",
    location: "서울 강동구",
    instructor: "윤봉길",
    schedule: "매주 토요일 오전 10시",
  },
  {
    id: 6,
    title: "우쿨렐레 레슨",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "무료",
    image: img6,
    duration: "1시간",
    location: "서울 송파구",
    instructor: "안중근",
    schedule: "매주 금요일 오후 2시",
  },
  {
    id: 7,
    title: "피아노 레슨",
    description: "클래식과 팝송을 함께 연주해요!",
    price: "무료",
    image: img7,
    duration: "1시간",
    location: "서울 강북구",
    instructor: "유관순",
    schedule: "매주 수요일 오후 5시",
  },
  {
    id: 8,
    title: "기타 레슨",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img8,
    duration: "1시간",
    location: "서울 중랑구",
    instructor: "황진이",
    schedule: "매주 토요일 오후 3시",
  },
  {
    id: 9,
    title: "밴드 연주",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "무료",
    image: img9,
    duration: "2시간",
    location: "서울 강남구",
    instructor: "김구",
    schedule: "매주 목요일 오후 7시",
  },
  {
    id: 10,
    title: "합창단",
    description: "다함께 노래하는 즐거운 시간",
    price: "무료",
    image: img10,
    duration: "2시간",
    location: "서울 강동구",
    instructor: "이순신",
    schedule: "매주 금요일 오후 7시",
  },
  {
    id: 11,
    title: "베이스 레슨",
    description: "베이스의 리듬과 멜로디를 연습해요!",
    price: "무료",
    image: img11,
    duration: "1시간",
    location: "서울 강서구",
    instructor: "유관순",
    schedule: "매주 화요일 오후 4시",
  },
  {
    id: 12,
    title: "드럼 레슨",
    description: "드럼의 강렬한 비트를 연습해요!",
    price: "무료",
    image: img12,
    duration: "1시간",
    location: "서울 강북구",
    instructor: "황진이",
    schedule: "매주 목요일 오후 5시",
  },
  {
    id: 13,
    title: "바이올린 레슨",
    description: "클래식과 현대 음악을 연주해요!",
    price: "무료",
    image: img13,
    duration: "1시간",
    location: "서울 송파구",
    instructor: "김구",
    schedule: "매주 수요일 오후 6시",
  },
  {
    id: 14,
    title: "첼로 레슨",
    description: "클래식 음악의 아름다움을 느껴요!",
    price: "무료",
    image: img14,
    duration: "1시간",
    location: "서울 중랑구",
    instructor: "안중근",
    schedule: "매주 토요일 오후 4시",
  },
];

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.id === parseInt(id));

  if (!program) {
    return <div className="error-message">프로그램을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="program-detail">
      <div className="program-detail-container">
        <img src={program.image} alt={program.title} className="detail-image" />
        <div className="detail-content">
          <h1 className="detail-title">{program.title}</h1>
          <p className="detail-description">{program.description}</p>

          <div className="program-info">
            <p>
              <strong>가격:</strong> {program.price}
            </p>
            <p>
              <strong>기간:</strong> {program.duration}
            </p>
            <p>
              <strong>장소:</strong> {program.location}
            </p>
            <p>
              <strong>강사:</strong> {program.instructor}
            </p>
            <p>
              <strong>일정:</strong> {program.schedule}
            </p>
          </div>

          <button className="cta-button">신청하기</button>
          <button className="back-btn" onClick={() => navigate("/")}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
