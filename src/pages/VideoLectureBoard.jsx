import React, { useState } from "react";
import "../styles/VideoLectureBoard.module.css";

const VideoLectureBoard = () => {
  const [videoLectures, setVideoLectures] = useState([]);
  const [isWriteMode, setIsWriteMode] = useState(false);

  const handleAddLecture = (newLecture) => {
    setVideoLectures([newLecture, ...videoLectures]);
    setIsWriteMode(false);
  };

  return (
    <div className="video-lecture">
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

const LectureList = ({ lectures, onWrite }) => {
  return (
    <div className="lecture-container">
      <div className="lecture-header">
        <div className="header-left">
          <span className="header-icon">🎓</span>
          <h1 className="header-title">List</h1>
          <span className="header-count">{lectures.length}개 강의</span>
        </div>
        <button onClick={onWrite} className="add-lecture-btn">
          <span className="btn-icon">✨</span>새 강의 등록
        </button>
      </div>

      {lectures.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎥</div>
          <h2 className="empty-title">등록된 영상 강의가 없습니다</h2>
          <p className="empty-description">
            새로운 강의를 등록하여 학습 컨텐츠를 공유해보세요. 영상 강의를 통해
            더 효과적인 학습 경험을 제공할 수 있습니다.
          </p>
          <button onClick={onWrite} className="empty-button">
            <span>✨</span> 첫 강의 등록하기
          </button>
        </div>
      ) : (
        <div className="lecture-grid">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="lecture-card">
              <div className="video-container">
                <video
                  className="lecture-thumbnail"
                  poster={lecture.thumbnail}
                  controls
                >
                  <source src={lecture.videoUrl} type="video/mp4" />
                </video>
                <div className="video-duration">14:35</div>
              </div>
              <div className="lecture-content">
                <h3 className="lecture-title">{lecture.title}</h3>
                {lecture.description && (
                  <p className="lecture-description">{lecture.description}</p>
                )}
                <div className="lecture-meta">
                  <div className="meta-left">
                    <span className="meta-icon">👥</span>
                    <span>수강생 0명</span>
                  </div>
                  <div className="upload-date">
                    <span>📅</span>
                    <span>{lecture.uploadDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WriteForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError("");
      } else {
        setError("비디오 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !videoFile) {
      setError("제목과 동영상 파일은 필수입니다.");
      return;
    }

    const newLecture = {
      id: Date.now(),
      title,
      description,
      videoUrl: previewUrl,
      uploadDate: new Date().toLocaleDateString(),
    };

    onSubmit(newLecture);
  };

  return (
    <div className="lecture-form">
      <div className="lecture-form-header">
        <span className="form-icon">📹</span>
        <h2 className="form-title">새 강의 등록</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">강의 제목</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="강의 제목을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label">강의 설명</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="강의에 대한 상세한 설명을 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label">강의 영상</label>
          {!videoFile ? (
            <div
              className={`upload-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📁</div>
              <h3 className="upload-title">강의 영상을 업로드해주세요</h3>
              <p className="upload-text">
                <label className="upload-label">
                  파일 선택하기
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
                <span> 또는 여기로 파일을 드래그하세요</span>
              </p>
              <p className="upload-hint">지원 형식: MP4, WebM (최대 500MB)</p>
            </div>
          ) : (
            <div className="video-preview-container">
              <h3 className="preview-title">미리보기</h3>
              <video controls className="preview-video">
                <source src={previewUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="button-group">
          <button
            type="button"
            onClick={onCancel}
            className="form-button button-cancel"
          >
            취소
          </button>
          <button type="submit" className="form-button button-submit">
            <span>✨</span> 강의 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};
export default VideoLectureBoard;
