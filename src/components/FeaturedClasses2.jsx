import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

// ProgramList에서 사용된 이미지들 가져오기
import imgPilates from "../assets/image/programDetails/PilatesTeacher2.jpg";
import imgEng from "../assets/image/programDetails/chungRaEng.png";
import imgCoding from "../assets/image/programImages/chungRaCoding.png";
import imgElec from "../assets/image/programImages/chungRaElec2.png";

const classes = [
  {
    id: 9, // 영어회화
    location: "인천",
    title: "일반 영어회화",
    price: "무료/Free",
    date: "2025년",
    image: imgEng,
  },
  {
    id: 9, // 영어회화
    location: "인천",
    title: "초,중,고 영어회화",
    price: "무료/Free",
    date: "2025년",
    image: imgEng,
  },
  {
    id: 14, // 코딩
    location: "인천",
    title: "융합코딩",
    price: "무료/Free",
    date: "2025년",
    image: imgCoding,
  },
  {
    id: 1, // 필라테스
    location: "인천",
    title: "필라테스",
    price: "무료/Free",
    date: "2025년",
    image: imgPilates,
  },
];
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleCardClick = (id) => {
    navigate(`/program/${id}`);
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤
  };
  return (
    <section className={styles.featuredClasses}>
      <div className={styles.header}>
        <h2>교육 클래스 </h2>
        <a
          href="#"
          className={styles.viewAll}
          onClick={() => navigate("/services")}
        >
          모두보기
        </a>
      </div>

      <Slider {...settings} className={styles.classList}>
        {classes.map((item) => (
          <div
            key={item.id}
            className={styles.classCard}
            onClick={() => handleCardClick(item.id)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
          >
            <img
              src={item.image}
              alt={item.title}
              className={styles.classImage}
            />
            <div className={styles.classInfo}>
              <span className={styles.classDate}>{item.date}</span>
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
