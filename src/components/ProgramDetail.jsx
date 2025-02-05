import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../assets/image/programImages/chungRaPilates.jpg";
import img2 from "../assets/image/poster/chungRaVocalPos.jpg";
import img4 from "../assets/image/programDetails/chungRaCajon.jpg";
import img5 from "../assets/image/programDetails/chungRaEng.png";
import img6 from "../assets/image/programDetails/chungRaUkulele.jpg";
import img7 from "../assets/image/programDetails/chungRaPiano.jpg";
import img8 from "../assets/image/programDetails/chungRaGuitar2.png";
import img9 from "../assets/image/programDetails/chungRaBand.jpg";
import img10 from "../assets/image/programDetails/chungRaChorus.jpg";
import img11 from "../assets/image/programDetails/chungRaBass.jpg";
import img12 from "../assets/image/poster/chungRaDrumPos.png";
import img13 from "../assets/image/programDetails/chungRaViolin.jpg";
import img14 from "../assets/image/programDetails/chungRaCheloThumb.jpg";
import img15 from "../assets/image/poster/chungRaElecPos.jpg";
import styles from "../styles/program.module.css";
import ApplyModal from "./ApplyModal";
import SuccessModal from "./SuccessModal";

const programs = [
  {
    id: 1,
    title: "필라테스",
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
    title: "보컬",
    description: "전문가와 함께하는 보컬 레슨",
    price: "무료",
    image: img2,
    duration: "1일",
    location: "청라 중앙공원",
    instructor: "이순신",
    schedule: "6월 15일 오후 2시",
  },
  {
    id: 4,
    title: "카혼",
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
    title: "영어 회화",
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
    title: "우쿨렐레",
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
    title: "피아노",
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
    title: "통기타",
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
    title: "밴드",
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
    title: "합창",
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
    title: "베이스",
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
    title: "드럼",
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
    title: "바이올린",
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
    title: "첼로",
    description: "클래식 음악의 아름다움을 느껴요!",
    price: "무료",
    image: img14,
    duration: "1시간",
    location: "서울 중랑구",
    instructor: "안중근",
    schedule: "매주 토요일 오후 4시",
  },
  {
    id: 15,
    title: "일렉기타",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "무료",
    image: img15,
    duration: "1시간",
    location: "서울 강남구",
    instructor: "황진이",
    schedule: "매주 일요일 오후 3시",
  },
];

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const program = programs.find((p) => p.id === parseInt(id));

  // 모달 상태 관리
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 신청 폼 제출 처리 함수
  const handleFormSubmit = (formData) => {
    // 폼 데이터 서버로 전송 (여기서는 콘솔에 출력)
    console.log(formData);
    setIsApplyModalOpen(false); // 신청 모달 닫기
    setIsSuccessModalOpen(true); // 신청 완료 모달 열기
  };

  // 프로그램이 없을 경우
  if (!program) {
    return (
      <div className={styles.errorMessage}>프로그램을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className={styles.programDetail}>
      <div className={styles.programDetailContainer}>
        {/* 이미지와 확대 모달 */}
        <div
          className={styles.imageWrapper}
          onClick={() => setIsImageModalOpen(true)}
        >
          <img
            loading="lazy"
            src={program.image}
            alt={program.title}
            className={styles.detailImage}
            onError={(e) => {
              e.target.src = "../assets/image/placeholder.jpg"; // 오류 시 기본 이미지
            }}
          />
          <div className={styles.imageOverlay}>
            <span>클릭하여 확대</span>
          </div>
        </div>

        {/* 이미지 확대 모달 */}
        {isImageModalOpen && (
          <div
            className={styles.modal}
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className={styles.modalContent}>
              <img
                src={program.image}
                alt={program.title}
                className={styles.modalImage}
              />
              <button
                className={styles.closeButton}
                onClick={() => setIsImageModalOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* 프로그램 상세 정보 */}
        <div className={styles.detailContent}>
          <h1 className={styles.detailTitle}>{program.title}</h1>
          <p className={styles.detailDescription}>{program.description}</p>

          <div className={styles.programInfo}>
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

          {/* 신청하기 버튼 */}
          <button
            className={styles.ctaButton}
            onClick={() => setIsApplyModalOpen(true)}
          >
            신청하기
          </button>

          {/* 목록으로 돌아가기 버튼 */}
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            목록으로 돌아가기
          </button>
        </div>
      </div>

      {/* 신청 모달 */}
      {isApplyModalOpen && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* 신청 완료 모달 */}
      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProgramDetail;
