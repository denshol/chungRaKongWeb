import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
      style={{ ...style, display: "block", right: "-10px" }}
      onClick={onClick}
    >
      <FaChevronRight size={30} color="#333" />
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
            // 한번 애니메이션이 실행된 후에는 observe 해제
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px",
      }
    );

    // 헤더 관찰 시작
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // 카드들 관찰 시작
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: null,
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

  const featuredClassIds = [6, 7, 13, 10, 3, 15, 12, 8];
  const featuredClasses = programs.filter((program) =>
    featuredClassIds.includes(program.id)
  );

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
          {featuredClasses.map((item, index) => (
            <div
              key={item.id}
              className={styles.classCard}
              onClick={() => navigate(`/program/${item.id}`)}
              style={{ cursor: "pointer" }}
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
                <p className={styles.classPrice}>{item.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedClasses;
