import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMusicPrograms } from "../data/programs";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Arrow = ({ className, onClick, isNext }) => {
  const arrowSVG = isNext ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
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

// ✅ forwardRef 적용
const FeaturedClasses = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleCardClick = (id) => {
    if (!isDragging) {
      navigate(`/program/${id}`);
    }
  };

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
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const musicPrograms = getMusicPrograms();

  return (
    <section className={styles.featuredClasses} ref={ref}>
      <div className={styles.header}>
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
          {musicPrograms.map((item) => (
            <div key={item.id} className={styles.cardWrapper}>
              <div
                className={styles.classCard}
                onClick={() => handleCardClick(item.id)}
                style={{ cursor: isDragging ? "grabbing" : "pointer" }}
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
});

export default FeaturedClasses;
