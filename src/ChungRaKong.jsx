import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ChungRaKong = () => {
  const menuBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (menuBtnRef.current && mobileMenuRef.current) {
      menuBtnRef.current.addEventListener("click", toggleMobileMenu);
    }
    return () => {
      if (menuBtnRef.current) {
        menuBtnRef.current.removeEventListener("click", toggleMobileMenu);
      }
    };
  }, []);

  const programs = [
    {
      id: 1,
      title: "리즈갱신 다이어트 챌린지",
      description: "지방은 빼고 라인을 지키는 ❤️‍🔥",
      price: 24750,
      rating: 4.9,
      ratingCount: 51,
      image: `${process.env.PUBLIC_URL}/assets/image/PilatesTeacher2.jpg`,
    },
    {
      id: 2,
      title: "리즈갱신 다이어트 챌린지",
      description: "지방은 빼고 라인을 지키는 ❤️‍🔥",
      price: 24750,
      rating: 4.9,
      ratingCount: 51,
      image: `${process.env.PUBLIC_URL}/assets/image/chungRaFestival.jpg`,
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* 네비게이션 바 */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/ChungRaKong.png`}
              alt="청라콩 로고"
              className="h-12 md:h-16"
            />
            <span className="text-2xl font-bold text-green-700">청라콩</span>
          </a>

          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="/" className="hover:text-green-500">
              홈
            </a>
            <a href="/about" className="hover:text-green-500">
              소개
            </a>
            <a href="/services" className="hover:text-green-500">
              서비스
            </a>
            <a href="/contact" className="hover:text-green-500">
              문의
            </a>
          </nav>

          <button
            ref={menuBtnRef}
            className="block md:hidden focus:outline-none"
          >
            <svg
              className="h-8 w-8 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-md`}
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a href="/" className="text-gray-700 hover:text-green-500">
              홈
            </a>
            <a href="/about" className="text-gray-700 hover:text-green-500">
              소개
            </a>
            <a href="/services" className="text-gray-700 hover:text-green-500">
              서비스
            </a>
            <a href="/contact" className="text-gray-700 hover:text-green-500">
              문의
            </a>
          </nav>
        </div>
      </header>

      {/* Swiper 슬라이더 */}
      <section className="my-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/programHead.png`}
              alt="튜터링 소개"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={`${process.env.PUBLIC_URL}/assets/image/chungRaSul.jpg`}
              alt="튜터링 성과"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 프로그램 섹션 */}
      <section className="mx-auto max-w-7xl w-full px-4 py-5">
        <h1 className="text-2xl font-bold text-green-700">청라콩 프로그램</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {program.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">
                    {program.price.toLocaleString()}원
                  </span>
                  <span className="text-yellow-400 text-sm">
                    ★ {program.rating} ({program.ratingCount})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white mt-16 py-8 text-center text-gray-600 border-t">
        © 2024 청라콩. All rights reserved.
      </footer>
    </div>
  );
};

export default ChungRaKong;
