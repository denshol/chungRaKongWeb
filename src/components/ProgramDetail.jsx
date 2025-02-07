import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { programs } from "../pages/Programs";
import styles from "../styles/program.module.css";
import ApplyModal from "./ApplyModal";
import SuccessModal from "./SuccessModal";

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const program = programs.find((p) => p.id === parseInt(id));

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log(formData);
    setIsApplyModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  if (!program) {
    return (
      <div className={styles.errorMessage}>프로그램을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className={styles.programDetail}>
      <div className={styles.programDetailContainer}>
        <div
          className={styles.imageWrapper}
          onClick={() => setIsImageModalOpen(true)}
        >
          <img
            loading="lazy"
            src={program.detailImage}
            alt={program.title}
            className={styles.detailImage}
            onError={(e) => {
              e.target.src = "../assets/image/placeholder.jpg";
            }}
          />
          <div className={styles.imageOverlay}>
            <span>클릭하여 확대</span>
          </div>
        </div>

        {isImageModalOpen && (
          <div
            className={styles.modal}
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className={styles.modalContent}>
              <img
                src={program.detailImage}
                alt={program.title}
                className={styles.modalImage}
              />
            </div>
          </div>
        )}

        <div className={styles.detailContent}>
          <h1 className={styles.detailTitle}>{program.title}</h1>
          <p className={styles.detailDescription}>{program.description}</p>

          <div className={styles.programInfo}>
            <p>
              <strong>가격:</strong> {program.price}
            </p>
            <p>
              <strong>장소:</strong> {program.location}
            </p>
            <p>
              <strong>일정:</strong> {program.schedule}
            </p>
          </div>

          <button
            className={styles.ctaButton}
            onClick={() => setIsApplyModalOpen(true)}
          >
            신청하기
          </button>

          <button className={styles.backBtn} onClick={() => navigate("/")}>
            목록으로 돌아가기
          </button>
        </div>
      </div>

      {isApplyModalOpen && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleFormSubmit}
          program={program}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProgramDetail;
