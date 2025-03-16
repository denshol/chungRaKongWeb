import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMusicPrograms } from "../data/programs"; // 예시 함수
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 화살표 컴포넌트 (인라인 SVG 버전)
const Arrow = ({ className, onClick, isNext }) => {
  // isNext === true 이면 오른쪽 화살표, false 이면 왼쪽 화살표
  const arrowSVG = isNext ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "rotate(180deg)" }}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );

  return (
    <div
      className={`${className} ${isNext ? styles.nextArrow : styles.prevArrow}`}
      onClick={onClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
    >
      {arrowSVG}
    </div>
  );
};

const FeaturedClasses = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTime = useRef(0);

  const handleDragStart = () => {
    setIsDragging(true);
    dragStartTime.current = Date.now();
  };

  const handleDragEnd = () => {
    const dragEndTime = Date.now();
    const dragDuration = dragEndTime - dragStartTime.current;
    setTimeout(() => setIsDragging(false), dragDuration < 100 ? 100 : 0);
  };

  const handleCardClick = (id) => {
    if (!isDragging) {
      navigate(`/program/${id}`);
    }
  };

  useEffect(() => {
    const observers = {
      header: new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.animate);
            }
          });
        },
        { threshold: 0.5, rootMargin: "-50px 0px" }
      ),

      card: new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.animate);
              observers.card.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-50px 0px" }
      ),
    };

    if (headerRef.current) {
      observers.header.observe(headerRef.current);
    }

    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.style.setProperty("--delay", `${index * 150}ms`);
        observers.card.observe(card);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow isNext={true} />,
    prevArrow: <Arrow isNext={false} />,
    swipe: true,
    swipeToSlide: true,
    beforeChange: handleDragStart,
    afterChange: handleDragEnd,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  const musicPrograms = getMusicPrograms(); // 예시 데이터 불러오기

  return (
    <section className={styles.featuredClasses} ref={sectionRef}>
      <div className={styles.header} ref={headerRef}>
        <h2>음악 클래스 🎸</h2>
        <a
          href="#"
          className={styles.viewAll}
          onClick={(e) => {
            e.preventDefault();
            navigate("/services");
          }}
        >
          모두보기
        </a>
      </div>

      <div className={styles.carouselContainer}>
        <Slider {...settings} className={styles.classList}>
          {musicPrograms.map((item, index) => (
            <div key={item.id} className={styles.cardWrapper}>
              <div
                className={styles.classCard}
                onClick={() => handleCardClick(item.id)}
                style={{ cursor: isDragging ? "grabbing" : "pointer" }}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.classImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.classInfo}>
                  <span className={styles.classDate}>{item.schedule}</span>
                  <h3 className={styles.classTitle}>{item.title}</h3>
                  <p className={styles.classLocation}>{item.location}</p>
                  <p className={styles.classPrice}>
                    {item.price}
                    {item.price !== "무료" && (
                      <span className={styles.priceTag}>유료</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedClasses;
