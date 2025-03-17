import React, { useEffect, useRef, memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { programs, CATEGORIES } from "../data/programs";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

// 메모이제이션된 화살표 컴포넌트
const Arrow = memo(({ className, onClick, direction, ariaLabel }) => (
  <div
    className={`${className} ${
      direction === "prev" ? styles.prevArrow : styles.nextArrow
    }`}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <FaChevronRight
      size={20}
      style={direction === "prev" ? { transform: "rotate(180deg)" } : undefined}
    />
  </div>
));

// 메모이제이션된 클래스 카드 컴포넌트
const ClassCard = memo(({ item, onClick, cardRef, index }) => (
  <div
    className={styles.classCard}
    onClick={onClick}
    style={{
      cursor: "pointer",
      "--delay": `${index * 150}ms`,
    }}
    ref={cardRef}
    role="button"
    tabIndex={0}
  >
    <div className={styles.imageWrapper}>
      <img
        src={item.image}
        alt={item.title}
        className={styles.classImage}
        loading={index < 2 ? "eager" : "lazy"} // 처음 두 이미지는 즉시 로드
        width="280"
        height="180"
      />
    </div>
    <div className={styles.classInfo}>
      <span className={styles.classDate}>{item.schedule}</span>
      <h3 className={styles.classTitle}>{item.title}</h3>
      <p className={styles.classLocation}>{item.location}</p>
      <p className={styles.classPrice}>{item.price}</p>
    </div>
  </div>
));

const FeaturedClasses2 = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  // Intersection Observer 최적화
  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            headerObserver.unobserve(entry.target); // 한 번 감지 후 해제
          }
        });
      },
      { threshold: 0.5, rootMargin: "-50px 0px" }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            cardsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px 0px" }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    cardRefs.current.forEach((card) => {
      if (card) {
        cardsObserver.observe(card);
      }
    });

    return () => {
      headerObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  // 슬라이더 설정 - useMemo로 최적화
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <Arrow direction="next" ariaLabel="Next slide" />,
      prevArrow: <Arrow direction="prev" ariaLabel="Previous slide" />,
      swipe: true,
      lazyLoad: "progressive", // 점진적 로딩으로 변경
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    }),
    []
  );

  // 교육 카테고리에 표시할 프로그램 ID 목록 - useMemo로 최적화
  const educationClassIds = useMemo(() => [9, 14, 16, 17], []);

  // 교육 클래스 필터링 - useMemo로 최적화
  const educationClasses = useMemo(
    () => programs.filter((program) => educationClassIds.includes(program.id)),
    [educationClassIds]
  );

  // 카드 클릭 핸들러 - useCallback으로 최적화
  const handleCardClick = useCallback(
    (id) => {
      navigate(`/program/${id}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  // 모두보기 클릭 핸들러 - useCallback으로 최적화
  const handleViewAllClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/services");
    },
    [navigate]
  );

  return (
    <section className={styles.featuredClasses} ref={sectionRef}>
      <div className={styles.header} ref={headerRef}>
        <h2>교육 클래스 🎓</h2>
        <a href="#" className={styles.viewAll} onClick={handleViewAllClick}>
          모두보기
        </a>
      </div>

      <div className={styles.carouselContainer}>
        <Slider {...settings} className={styles.classList}>
          {educationClasses.map((item, index) => (
            <ClassCard
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item.id)}
              cardRef={(el) => (cardRefs.current[index] = el)}
              index={index}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default memo(FeaturedClasses2);
