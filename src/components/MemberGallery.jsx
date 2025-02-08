import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/MemberGallery.module.css";

const MemberGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

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

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            itemObserver.unobserve(entry.target);
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

    itemRefs.current.forEach((item, index) => {
      if (item) {
        item.style.setProperty("--delay", `${index * 150}ms`);
        itemObserver.observe(item);
      }
    });

    return () => {
      headerObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const images = [
    {
      id: 1,
      src: "/image/member/concert4.jpg",
      title: "",
      subtitle: "",
      description: "",
      icon: "🎵",
      badgeType: "purple",
    },
    {
      id: 2,
      src: "/image/member/concert5.jpg",
      title: "",
      subtitle: "",
      description: " 함께하는 즐거움",
      icon: "⭐",
      badgeType: "gray",
    },
    {
      id: 3,
      src: "/image/member/concert6.jpg",
      title: "",
      subtitle: "",
      description: " 함께하는 즐거움",
      icon: "🏆",
      badgeType: "gray",
    },
    {
      id: 4,
      src: "/image/member/concert7.jpg",
      title: "",
      subtitle: "",
      description: "음악으로 전하는 감동",
      icon: "💝",
      badgeType: "gray",
    },
    {
      id: 5,
      src: "/image/member/concert8.jpg",
      title: "",
      subtitle: "",
      description: "꿈을 향한 도전",
      icon: "⭐",
      badgeType: "gray",
    },
    {
      id: 6,
      src: "/image/member/concert9.jpg",
      title: "",
      subtitle: "",
      description: "최고를 향한 열정",
      icon: "🏆",
      badgeType: "gray",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} ref={headerRef}>
        <h1 className={styles.mainTitle}>청라콩 갤러리</h1>
        <p className={styles.subtitle}>우리의 열정과 재능이 만나는 곳</p>
      </div>

      <div className={styles.grid}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={styles.gridItem}
            onClick={() => openModal(image)}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={image.src}
                alt={image.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{image.icon}</span>
                  <span
                    className={`${styles.badge} ${
                      image.badgeType === "purple"
                        ? styles.badgePurple
                        : styles.badgeGray
                    }`}
                  >
                    청라콩
                  </span>
                </div>
                <h3 className={styles.imageTitle}>{image.title}</h3>
                <p className={styles.imageSubtitle}>{image.subtitle}</p>
                <p className={styles.description}>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={`${styles.modal} ${styles.modalVisible}`}
          onClick={closeModal}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalImageWrapper}>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalInfo}>
              <div className={styles.modalHeader}>
                <span className={styles.modalIcon}>{selectedImage.icon}</span>
                <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
              </div>
              <p className={styles.modalSubtitle}>{selectedImage.subtitle}</p>
              <p className={styles.modalDescription}>
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberGallery;
