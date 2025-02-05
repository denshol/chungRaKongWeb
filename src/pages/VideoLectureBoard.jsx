import React, { useState, useEffect } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import {
  MdAdd,
  MdClose,
  MdPlayCircleOutline,
  MdTitle,
  MdVideoLibrary,
} from "react-icons/md";
import styles from "../styles/VideoLectureBoard.module.css";
import { FaVideo } from "react-icons/fa";

// WriteForm 컴포넌트 정의
const WriteForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !videoUrl) return;
    onSubmit({ id: Date.now(), title, videoUrl });
  };

  return (
    <div className={styles.lectureForm}>
      <div className={styles.formHeader}>
        <div className={styles.formTitleWrapper}>
          <FaVideo className={styles.formIcon} size={24} />
          <h2 className={styles.formTitle}>새 강의 등록</h2>
        </div>
        <button onClick={onCancel} className={styles.closeButton}>
          <MdClose size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <MdTitle className={styles.inputIcon} />
            강의 제목
          </label>
          <input
            type="text"
            placeholder="강의 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <MdVideoLibrary className={styles.inputIcon} />
            영상 URL
          </label>
          <input
            type="text"
            placeholder="영상 URL을 입력하세요"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            <MdClose size={20} />
            취소
          </button>
          <button type="submit" className={styles.submitButton}>
            <MdAdd size={20} />
            강의 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

// LectureList 컴포넌트 정의
const LectureList = ({ lectures, onWrite }) => (
  <div className={styles.lectureContainer}>
    <div className={styles.lectureHeader}>
      <div className={styles.headerLeft}>
        <MdPlayCircleOutline size={32} className={styles.headerIcon} />
        <h1 className={styles.headerTitle}>강의 목록</h1>
        <span className={styles.headerCount}>{lectures.length}개의 강의</span>
      </div>
      <button onClick={onWrite} className={styles.addLectureBtn}>
        <RiVideoAddFill size={20} />새 강의 등록
      </button>
    </div>

    <div className={styles.lectureGrid}>
      {lectures.length > 0 ? (
        lectures.map((lecture) => (
          <div key={lecture.id} className={styles.lectureCard}>
            <div className={styles.videoContainer}>
              <video className={styles.lectureThumbnail} controls>
                <source src={lecture.videoUrl} type="video/mp4" />
              </video>
              <div className={styles.videoOverlay}>
                <MdPlayCircleOutline size={48} className={styles.playIcon} />
              </div>
            </div>
            <div className={styles.lectureContent}>
              <h3 className={styles.lectureTitle}>{lecture.title}</h3>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyState}>
          <MdPlayCircleOutline size={48} />
          <p>등록된 강의가 없습니다.</p>
          <button onClick={onWrite} className={styles.emptyStateButton}>
            첫 강의 등록하기
          </button>
        </div>
      )}
    </div>
  </div>
);

// 메인 VideoLectureBoard 컴포넌트
const VideoLectureBoard = () => {
  const [videoLectures, setVideoLectures] = useState([]);
  const [isWriteMode, setIsWriteMode] = useState(false);

  useEffect(() => {
    const storedLectures =
      JSON.parse(localStorage.getItem("videoLectures")) || [];
    setVideoLectures(storedLectures);
  }, []);

  const handleAddLecture = (newLecture) => {
    const updatedLectures = [newLecture, ...videoLectures];
    setVideoLectures(updatedLectures);
    localStorage.setItem("videoLectures", JSON.stringify(updatedLectures));
    setIsWriteMode(false);
  };

  return (
    <div className={styles.videoLecture}>
      {isWriteMode ? (
        <WriteForm
          onSubmit={handleAddLecture}
          onCancel={() => setIsWriteMode(false)}
        />
      ) : (
        <LectureList
          lectures={videoLectures}
          onWrite={() => setIsWriteMode(true)}
        />
      )}
    </div>
  );
};

export default VideoLectureBoard;
