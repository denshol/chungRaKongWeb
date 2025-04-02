import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import styles from "../styles/ProgramRanking.module.css";
import imgGuitar from "../assets/image/programDetails/chungRaGuitar2.png";
import imgDrum from "../assets/image/programImages/chungRaDrum.png";
import imgVocal from "../assets/image/poster/chungRaVocalPos.jpg";
import imgEng from "../assets/image/programDetails/chungRaEng.png";

// ✅ 여기 바뀐 부분!
const ProgramRanking = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-50px 0px",
      }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.setProperty("--delay", `${index * 200}ms`);
        cardObserver.observe(card);
      }
    });

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const rankings = [
    {
      id: 6,
      title: "통기타",
      instructor: "유준영 강사",
      students: 128,
      rating: 4.9,
      image: imgGuitar,
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
    if (event.target.closest(`.${styles.likeButton}`)) return;
    navigate(`/program/${programId}`);
  };

  // ✅ 여기서 ref를 적용!
  return (
    <section className={styles.rankingSection} ref={ref}>
      <div className={styles.rankingHeader} ref={headerRef}>
        <h2>실시간 인기 클래스 TOP 4</h2>
        <p className={styles.subTitle}>
          현재 가장 인기 있는 클래스를 만나보세요!
        </p>
      </div>

      <div className={styles.rankingContainer}>
        {rankings.map((program, index) => (
          <div
            key={program.id}
            className={`${styles.rankingCard} ${
              index === 0 ? styles.topRank : ""
            }`}
            onClick={(e) => handleCardClick(program.id, e)}
            ref={(el) => (cardsRef.current[index] = el)}
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
              <img src={program.image} alt={program.title} loading="lazy" />
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
});

export default ProgramRanking;
