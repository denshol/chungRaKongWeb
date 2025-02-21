import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

const Arrow = ({ className, onClick, direction, ariaLabel }) => (
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
);

const FeaturedClasses2 = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

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

      cards: new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.animate);
              observers.cards.unobserve(entry.target);
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
        observers.cards.observe(card);
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
    nextArrow: <Arrow direction="next" ariaLabel="Next slide" />,
    prevArrow: <Arrow direction="prev" ariaLabel="Previous slide" />,
    swipe: true,
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
              ref={(el) => (cardRefs.current[index] = el)}
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
                <p className={styles.classPrice}>{item.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedClasses2;
