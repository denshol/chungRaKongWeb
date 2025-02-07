import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FeaturedClasses.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight } from "react-icons/fa";

// ProgramList에서 사용된 이미지들
import imgGuitar from "../assets/image/programDetails/chungRaGuitar2.png";
import imgDrum from "../assets/image/programImages/chungRaDrum.png";
import imgBass from "../assets/image/programImages/chungRaBass.png";
import imgElec from "../assets/image/programImages/chungRaElec2.png";
import imgCajon from "../assets/image/programImages/chungRaCajon.png";
import imgChorus from "../assets/image/programImages/chungRaChorus.png";
import imgBand from "../assets/image/programImages/chungRaBand2.png";
import imgPiano from "../assets/image/programImages/chungRaPiano.png";

const classes = [
  {
    id: 6, // 통기타
    location: "인천",
    title: "통기타",
    price: "무료/Free",
    date: "2025년",
    image: imgGuitar,
  },
  {
    id: 7, // 드럼
    location: "인천",
    title: "드럼",
    price: "무료/Free",
    date: "2025년",
    image: imgDrum,
  },
  {
    id: 13, // 베이스
    location: "인천",
    title: "베이스",
    price: "무료/Free",
    date: "2025년",
    image: imgBass,
  },
  {
    id: 10, // 일렉기타
    location: "인천",
    title: "일렉기타",
    price: "무료/Free",
    date: "2025년",
    image: imgElec,
  },
  {
    id: 3, // 카혼
    location: "인천",
    title: "카혼",
    price: "무료/Free",
    date: "2025년",
    image: imgCajon,
  },
  {
    id: 15, // 합창
    location: "인천",
    title: "합창단",
    price: "무료/Free",
    date: "2025년",
    image: imgChorus,
  },
  {
    id: 12, // 밴드
    location: "인천",
    title: "밴드",
    price: "무료/Free",
    date: "2025년",
    image: imgBand,
  },
  {
    id: 8, // 피아노
    location: "인천",
    title: "피아노",
    price: "무료/Free",
    date: "2025년",
    image: imgPiano,
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
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className={styles.featuredClasses}>
      <div className={styles.header}>
        <h2>음악 클래스 </h2>
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
            onClick={() => navigate(`/program/${item.id}`)}
            style={{ cursor: "pointer" }}
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
