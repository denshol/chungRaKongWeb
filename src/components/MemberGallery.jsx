import React, { useState } from "react";
import styles from "../styles/MemberGallery.module.css";

const MemberGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "/image/member/concert4.jpg",
      title: "BUNGEE",
      subtitle: "BAEK HYUN",
      description: "보컬의 새로운 차원을 열다",
      icon: "🎵",
      badgeType: "purple",
    },
    {
      id: 2,
      src: "/image/member/concert5.jpg",
      title: "모래공장 레벨테스트",
      subtitle: "김무진 / LV : 5LM",
      description: "열정과 실력의 조화",
      icon: "⭐",
      badgeType: "gray",
    },
    {
      id: 3,
      src: "/image/member/concert6.jpg",
      title: "모래공장 레벨테스트",
      subtitle: "김은재 LV : 6HO",
      description: "무한한 가능성의 시작",
      icon: "🏆",
      badgeType: "gray",
    },
    {
      id: 4,
      src: "/image/member/concert7.jpg",
      title: "모래공장 레벨테스트",
      subtitle: "조현 LV : 5LM",
      description: "음악으로 전하는 감동",
      icon: "💝",
      badgeType: "gray",
    },
    {
      id: 5,
      src: "/image/member/concert8.jpg",
      title: "모래공장 레벨테스트",
      subtitle: "김민 LV : 5LM",
      description: "꿈을 향한 도전",
      icon: "⭐",
      badgeType: "gray",
    },
    {
      id: 6,
      src: "/image/member/concert9.jpg",
      title: "2025 한양대 보컬",
      subtitle: "입시합격곡 (가요)",
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
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>청라콩 갤러리</h1>
        <p className={styles.subtitle}>우리의 열정과 재능이 만나는 곳</p>
      </div>

      <div className={styles.grid}>
        {images.map((image) => (
          <div
            key={image.id}
            className={styles.gridItem}
            onClick={() => openModal(image)}
          >
            <div className={styles.imageWrapper}>
              <img src={image.src} alt={image.title} className={styles.image} />
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
          <div className={styles.modalContent}>
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
