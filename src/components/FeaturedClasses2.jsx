import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import styles from "../styles/FeaturedClasses2.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { className, onClick } = props; // className 추가
  return (
    <div
      className={`${className} ${styles.nextArrow}`} // slick 기본 클래스 포함
      onClick={onClick}
      aria-label="Next slide"
    >
      <FaChevronRight size={20} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${styles.prevArrow}`}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FaChevronRight size={20} style={{ transform: "rotate(180deg)" }} />
    </div>
  );
};

const FeaturedClasses = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

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
        threshold: 0.2,
        rootMargin: "-50px 0px",
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    const cards = document.querySelectorAll(`.${styles.classCard}`);
    cards.forEach((card, index) => {
      card.style.setProperty("--delay", `${index * 150}ms`);
      cardObserver.observe(card);
    });

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // settings 수정
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />, // 이 부분만 남기고 중복된 prevArrow: null 제거
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  const featuredClassIds = [9, 14, 1];
  const featuredClasses = programs.filter((program) =>
    featuredClassIds.includes(program.id)
  );

  const handleCardClick = (id) => {
    navigate(`/program/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className={styles.featuredClasses} ref={sectionRef}>
      <div className={styles.header} ref={headerRef}>
        <h2>교육 클래스 🎓</h2>
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
          {featuredClasses.map((item, index) => (
            <div
              key={item.id}
              className={styles.classCard}
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
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
                <p className={styles.classPrice} style={{ color: "green" }}>
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedClasses;
