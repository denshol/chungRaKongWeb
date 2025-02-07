import React from "react";
import { useNavigate } from "react-router-dom";
import { programs } from "../data/programs"; // 프로그램 데이터 불러오기
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: null,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // 표시하고 싶은 클래스 ID 배열
  const featuredClassIds = [6, 7, 13, 10, 3, 15, 12, 8];

  // featuredClassIds에 해당하는 프로그램 필터링
  const featuredClasses = programs.filter((program) =>
    featuredClassIds.includes(program.id)
  );

  return (
    <section className={styles.featuredClasses}>
      <div className={styles.header}>
        <h2>음악 클래스 🎸</h2>
        <a
          href="#"
          className={styles.viewAll}
          onClick={() => navigate("/services")}
        >
          모두보기
        </a>
      </div>

      <Slider {...settings} className={styles.classList}>
        {featuredClasses.map((item) => (
          <div
            key={item.id}
            className={styles.classCard}
            onClick={() => navigate(`/program/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className={styles.classImage}
            />
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
    </section>
  );
};

export default FeaturedClasses;
