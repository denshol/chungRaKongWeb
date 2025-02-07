import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaUsers, FaRegHeart, FaStar } from "react-icons/fa";
import styles from "../styles/ProgramRanking.module.css";

// 이미지 임포트 (프로젝트 경로에 맞게 조정)
import imgGuitar from "../assets/image/programDetails/chungRaGuitar2.png";
import imgDrum from "../assets/image/programImages/chungRaDrum.png";
import imgVocal from "../assets/image/poster/chungRaVocalPos.jpg";
import imgPiano from "../assets/image/programDetails/chungRaPiano.jpg";
import imgEng from "../assets/image/programDetails/chungRaEng.png";

const ProgramRanking = () => {
  const navigate = useNavigate();

  // 임시 샘플 데이터 (필요에 따라 API 호출 등으로 대체)
  const rankings = [
    {
      id: 6,
      title: "통기타",
      instructor: "유준영 강사",
      students: 128,
      rating: 4.9,
      image: imgGuitar,
      tag: "신규 오픈",
      description: "초보자도 쉽게 배우는 통기타 클래스",
      lesson_time: "60분",
      reviews: 242,
    },
    {
      id: 7,
      title: "드럼",
      instructor: "Peter 강사",
      students: 98,
      rating: 4.8,
      image: imgDrum,
      description: "기초부터 심화까지 체계적인 커리큘럼",
      lesson_time: "50분",
      reviews: 186,
    },
    {
      id: 2,
      title: "보컬",
      instructor: "Peter 강사",
      students: 112,
      rating: 4.9,
      image: imgVocal,
      tag: "인기",
      description: "K-POP 보컬 트레이닝",
      lesson_time: "40분",
      reviews: 156,
    },
    {
      id: 9,
      title: "영어회화",
      instructor: "Jay,Kang 강사",
      students: 95,
      rating: 4.7,
      image: imgEng,
      description: "실전 영어 회화",
      lesson_time: "50분",
      reviews: 134,
    },
  ];

  const handleCardClick = (programId, event) => {
    // 좋아요 버튼 클릭 시 상세 페이지로 이동하지 않도록 방지
    if (event.target.closest(`.${styles.likeButton}`)) {
      return;
    }
    navigate(`/program/${programId}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    // 좋아요 기능 구현 (예: 서버 API 호출 또는 로컬 상태 변경)
  };

  return (
    <section className={styles.rankingSection}>
      <div className={styles.rankingHeader}>
        <h2>실시간 인기 클래스 TOP 4</h2>
        <p className={styles.subTitle}>현재 가장 인기 있는 클래스를 만나보세요!</p>
      </div>

      <div className={styles.rankingContainer}>
        {rankings.map((program, index) => (
          <div
            key={program.id}
            className={`${styles.rankingCard} ${index === 0 ? styles.topRank : ""}`}
            onClick={(e) => handleCardClick(program.id, e)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.rankBadge}>
              {index === 0 ? (
                <FaTrophy className={styles.goldTrophy} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className={styles.cardImage}>
              <img src={program.image} alt={program.title} />
              {program.tag && <span className={styles.tag}>{program.tag}</span>}
            </div>

            <div className={styles.cardContent}>
              <div className={styles.mainInfo}>
                <h3>{program.title}</h3>
                <p className={styles.instructor}>{program.instructor}</p>
              </div>
              <div className={styles.lessonInfo}>
                <span className={styles.time}>⏰ {program.lesson_time}</span> 
              </div>
              <p className={styles.description}>{program.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramRanking;
