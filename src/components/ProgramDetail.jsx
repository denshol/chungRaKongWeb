import React, { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import styles from "../styles/program.module.css";
import ApplyModal from "./ApplyModal";
import SuccessModal from "./SuccessModal";

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useMemo로 프로그램 찾기 - 불필요한 재계산 방지
  const program = useMemo(
    () => programs.find((p) => p.id === parseInt(id)),
    [id]
  );

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // useCallback으로 함수 최적화
  const handleOpenApplyModal = useCallback(() => {
    setIsApplyModalOpen(true);
  }, []);

  const handleCloseApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  const handleOpenImageModal = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const handleCloseImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  const handleCloseSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
  }, []);

  const handleFormSubmit = useCallback((formData) => {
    console.log(formData);
    setIsApplyModalOpen(false);
    setIsSuccessModalOpen(true);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!program) {
    return (
      <div className={styles.errorMessage}>프로그램을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className={styles.programDetail}>
      <div className={styles.programDetailContainer}>
        <div className={styles.imageWrapper} onClick={handleOpenImageModal}>
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
          <div className={styles.modal} onClick={handleCloseImageModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
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

          <button className={styles.ctaButton} onClick={handleOpenApplyModal}>
            신청하기
          </button>

          <button className={styles.backBtn} onClick={handleGoBack}>
            목록으로 돌아가기
          </button>
        </div>
      </div>

      {/* 모달 컴포넌트: 항상 렌더링하는 대신 조건부 렌더링으로 성능 향상 */}
      {isApplyModalOpen && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={handleCloseApplyModal}
          onSubmit={handleFormSubmit}
          initialProgramId={program.id}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};

export default ProgramDetail;
