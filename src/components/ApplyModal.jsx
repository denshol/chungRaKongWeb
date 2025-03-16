import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiX,
  FiClock,
  FiUsers,
  FiMail,
  FiMusic,
  FiBook,
  FiHeart,
  FiTool,
  FiCheck,
  FiSearch,
  FiCalendar,
  FiAlertCircle,
  FiEdit,
  FiFilter,
  FiGrid,
  FiInfo,
  FiLoader,
} from "react-icons/fi";
import { programs, CATEGORIES } from "../data/programs";
import apiService from "../utils/apiService";
import styles from "../styles/ApplyModal.module.css";

const ApplyModal = ({ isOpen, onClose, onSubmit, initialProgramId = null }) => {
  // 초기 프로그램 ID가 있으면 해당 프로그램 찾기, 없으면 null
  const initialProgram = useMemo(
    () =>
      initialProgramId ? programs.find((p) => p.id === initialProgramId) : null,
    [initialProgramId]
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "",
    companions: "0",
    message: "",
    programId: initialProgramId || "",
    programTitle: initialProgram ? initialProgram.title : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showProgramSelector, setShowProgramSelector] = useState(
    !initialProgramId
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 프로그램 ID가 변경되면 프로그램 제목 업데이트
  useEffect(() => {
    if (formData.programId) {
      const program = programs.find(
        (p) => p.id === parseInt(formData.programId)
      );
      if (program) {
        setFormData((prev) => ({
          ...prev,
          programTitle: program.title,
        }));
      }
    }
  }, [formData.programId]);

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = useCallback((value) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  }, []);

  // 폼 유효성 검사
  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "이름을 입력해주세요.";
    }

    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const plainPhone = formData.phone.replace(/-/g, "");
    if (!plainPhone || !phoneRegex.test(plainPhone)) {
      errors.phone = "유효한 전화번호를 입력해주세요.";
    }

    // 이메일 유효성 검사
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "유효한 이메일 주소를 입력해주세요.";
      }
    }

    // 프로그램 선택 필수
    if (!formData.programId) {
      errors.programId = "프로그램을 선택해주세요.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // 폼 입력값 변경 핸들러
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      let newValue = value;

      if (name === "phone") {
        newValue = formatPhoneNumber(value);
      }

      setFormData((prev) => ({ ...prev, [name]: newValue }));

      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [fieldErrors, formatPhoneNumber]
  );

  // 프로그램 선택 핸들러
  const handleProgramSelect = useCallback((programId) => {
    const program = programs.find((p) => p.id === programId);
    setFormData((prev) => ({
      ...prev,
      programId: programId.toString(),
      programTitle: program.title,
    }));
    setShowProgramSelector(false);
    setFieldErrors((prev) => ({ ...prev, programId: "" }));
  }, []);

  // 카테고리별 아이콘 반환 함수
  const getCategoryIcon = useCallback((category) => {
    switch (category) {
      case CATEGORIES.MUSIC:
        return <FiMusic />;
      case CATEGORIES.EDUCATION:
        return <FiBook />;
      case CATEGORIES.HEALTH:
        return <FiHeart />;
      case CATEGORIES.TECHNICAL:
        return <FiTool />;
      default:
        return null;
    }
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        setError("입력 정보를 다시 확인해주세요.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        // apiService를 사용한 최적화된 요청
        const response = await apiService.submitApplication(formData);
        console.log("신청 완료:", response);

        onSubmit(formData);
        onClose();
      } catch (error) {
        console.error("신청 실패:", error);

        // apiService에서 제공하는 사용자 친화적 메시지 사용
        setError(error.userMessage || "신청 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [formData, onClose, onSubmit, validateForm]
  );

  // 필터링된 프로그램 목록 계산 (메모이제이션)
  const filteredPrograms = useMemo(() => {
    let filtered = programs;

    // 카테고리 필터링
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (program) => program.category === selectedCategory
      );
    }

    // 검색어 필터링
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(term) ||
          program.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  // 선택된 프로그램 계산 (메모이제이션)
  const selectedProgram = useMemo(
    () =>
      formData.programId
        ? programs.find((p) => p.id === parseInt(formData.programId))
        : null,
    [formData.programId]
  );

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="닫기"
        >
          <FiX size={24} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>프로그램 신청</h2>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <FiAlertCircle />
            {error}
          </div>
        )}

        {/* 프로그램 선택 영역 */}
        {!showProgramSelector && selectedProgram ? (
          <div className={styles.selectedProgramBox}>
            <div className={styles.selectedProgramInfo}>
              {getCategoryIcon(selectedProgram.category)}
              <div className={styles.selectedProgramText}>
                <span className={styles.selectedProgramTitle}>
                  {selectedProgram.title}
                </span>
                <span className={styles.selectedProgramSchedule}>
                  <FiClock /> {selectedProgram.schedule}
                </span>
              </div>
            </div>
            <button
              className={styles.changeProgramButton}
              onClick={() => setShowProgramSelector(true)}
              type="button"
              aria-label="프로그램 변경"
            >
              <FiEdit /> 변경
            </button>
          </div>
        ) : (
          <div className={styles.programSelectorContainer}>
            <h3 className={styles.sectionTitle}>
              <FiGrid /> 프로그램 선택
            </h3>

            {/* 프로그램 검색 및 필터링 */}
            <div className={styles.programFilters}>
              <div className={styles.searchInputContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="프로그램 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.programSearchInput}
                  aria-label="프로그램 검색"
                />
              </div>

              <div className={styles.categoryFilters}>
                <button
                  className={`${styles.categoryButton} ${
                    selectedCategory === "all" ? styles.activeCategory : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                  type="button"
                >
                  <FiFilter /> 전체
                </button>
                {Object.values(CATEGORIES).map((category) => (
                  <button
                    key={category}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category ? styles.activeCategory : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    type="button"
                  >
                    {getCategoryIcon(category)} {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 프로그램 목록 */}
            <div className={styles.programList}>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    className={styles.programCard}
                    onClick={() => handleProgramSelect(program.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${program.title} 선택`}
                  >
                    <div className={styles.programCardContent}>
                      <div className={styles.programCategory}>
                        {getCategoryIcon(program.category)} {program.category}
                      </div>
                      <h4 className={styles.programTitle}>{program.title}</h4>
                      <p className={styles.programSchedule}>
                        <FiClock /> {program.schedule}
                      </p>
                    </div>
                    <div className={styles.programSelectButton}>
                      <FiCheck />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <FiInfo />
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </div>

            {fieldErrors.programId && (
              <div className={styles.fieldError}>
                <FiAlertCircle /> {fieldErrors.programId}
              </div>
            )}
          </div>
        )}

        {/* 신청자 정보 입력 폼 */}
        <form onSubmit={handleSubmit} noValidate className={styles.simpleForm}>
          <h3 className={styles.sectionTitle}>
            <FiUser /> 신청자 정보
          </h3>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.name ? styles.inputError : ""
              }`}
              required
              aria-label="이름"
              aria-invalid={fieldErrors.name ? "true" : "false"}
            />
            {fieldErrors.name && (
              <div className={styles.fieldError} role="alert">
                <FiAlertCircle /> {fieldErrors.name}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiPhone />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="전화번호"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.phone ? styles.inputError : ""
              }`}
              required
              aria-label="전화번호"
              aria-invalid={fieldErrors.phone ? "true" : "false"}
            />
            {fieldErrors.phone && (
              <div className={styles.fieldError} role="alert">
                <FiAlertCircle /> {fieldErrors.phone}
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon}>
              <FiMail />
            </div>
            <input
              type="email"
              name="email"
              placeholder="이메일 (연락받을 주소)"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                fieldErrors.email ? styles.inputError : ""
              }`}
              aria-label="이메일"
              aria-invalid={fieldErrors.email ? "true" : "false"}
            />
            {fieldErrors.email && (
              <div className={styles.fieldError} role="alert">
                <FiAlertCircle /> {fieldErrors.email}
              </div>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <div className={styles.inputIcon}>
                <FiClock />
              </div>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className={styles.input}
                aria-label="선호 시간대"
              >
                <option value="">선호 시간대</option>
                <option value="평일 오전">평일 오전</option>
                <option value="평일 오후">평일 오후</option>
                <option value="평일 저녁">평일 저녁</option>
                <option value="주말">주말</option>
              </select>
            </div>

            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <div className={styles.inputIcon}>
                <FiUsers />
              </div>
              <select
                name="companions"
                value={formData.companions}
                onChange={handleChange}
                className={styles.input}
                aria-label="동반 인원"
              >
                <option value="0">혼자 참석</option>
                <option value="1">1명과 함께</option>
                <option value="2+">2명 이상과 함께</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputIcon} style={{ top: "24px" }}>
              <FiMessageSquare />
            </div>
            <textarea
              name="message"
              placeholder="남기실 말씀 (선택사항)"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows="2"
              aria-label="남기실 말씀"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <FiLoader className={styles.spinnerIcon} /> 처리중...
                </>
              ) : (
                "신청하기"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
