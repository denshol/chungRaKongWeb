// src/components/auth/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Register.module.css";
import { CATEGORIES } from "../../data/programs";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheck,
  FaMusic,
  FaBook,
  FaHeartbeat,
  FaTools,
  FaPhone,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    currentClasses: [], // 관심사 -> 현재 듣고 있는 강의로 변경
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassToggle = (className) => {
    if (formData.currentClasses.includes(className)) {
      setFormData({
        ...formData,
        currentClasses: formData.currentClasses.filter(
          (item) => item !== className
        ),
      });
    } else {
      setFormData({
        ...formData,
        currentClasses: [...formData.currentClasses, className],
      });
    }
  };

  // 전화번호 형식 검증 함수
  const validatePhoneNumber = (phoneNumber) => {
    // 한국 전화번호 형식 검증 (000-0000-0000 또는 000-000-0000)
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phoneNumber.replace(/-/g, ""));
  };

  const validateStep1 = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("모든 필수 필드를 입력해주세요.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.phoneNumber) {
      setError("전화번호를 입력해주세요.");
      return false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("유효한 전화번호 형식이 아닙니다. (예: 010-1234-5678)");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setError("");
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 전화번호 필수 검증
    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      // 회원가입 처리 (기본 정보 + 확장 정보)
      await signup(formData.email, formData.password, formData.name, {
        phoneNumber: formData.phoneNumber,
        interests: formData.currentClasses, // DB 필드명은 그대로 유지
      });
      navigate("/");
    } catch (error) {
      console.error("회원가입 오류:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (error.code === "auth/invalid-email") {
        setError("유효하지 않은 이메일 형식입니다.");
      } else if (error.code === "auth/weak-password") {
        setError("비밀번호가 너무 약합니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 프로그램 카테고리별 그룹 렌더링
  const renderProgramCategories = () => {
    const categoryIcons = {
      [CATEGORIES.MUSIC]: <FaMusic />,
      [CATEGORIES.EDUCATION]: <FaBook />,
      [CATEGORIES.HEALTH]: <FaHeartbeat />,
      [CATEGORIES.TECHNICAL]: <FaTools />,
    };

    const programsByCategory = {
      [CATEGORIES.MUSIC]: [
        "통기타",
        "드럼",
        "피아노",
        "일렉기타",
        "베이스",
        "우쿨렐레",
        "카혼",
        "바이올린",
        "첼로",
        "밴드",
        "보컬",
      ],
      [CATEGORIES.EDUCATION]: ["영어 회화", "코딩"],
      [CATEGORIES.HEALTH]: ["필라테스", "물리치료"],
      [CATEGORIES.TECHNICAL]: ["전기이론"],
    };

    return Object.entries(programsByCategory).map(([category, programs]) => (
      <div key={category} className={styles.categoryGroup}>
        <h3 className={styles.categoryTitle}>
          <span className={styles.categoryIcon}>{categoryIcons[category]}</span>
          {category}
        </h3>
        <div className={styles.interestOptions}>
          {programs.map((program) => (
            <div
              key={program}
              className={`${styles.interestOption} ${
                formData.currentClasses.includes(program) ? styles.selected : ""
              }`}
              onClick={() => handleClassToggle(program)}
            >
              {program}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.registerTitle}>청라콩 회원가입</h2>
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
            1
          </div>
          <div className={styles.stepLine}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
            2
          </div>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className={styles.formStep}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">이름</label>
                <div className={styles.inputWithIcon}>
                  <FaUser className={styles.icon} />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="이름을 입력하세요"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">이메일</label>
                <div className={styles.inputWithIcon}>
                  <FaEnvelope className={styles.icon} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">비밀번호</label>
                <div className={styles.inputWithIcon}>
                  <FaLock className={styles.icon} />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
                <small className={styles.helperText}>
                  비밀번호는 최소 6자 이상이어야 합니다.
                </small>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <div className={styles.inputWithIcon}>
                  <FaCheck className={styles.icon} />
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                </div>
              </div>

              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNextStep}
              >
                다음
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.formStep}>
              <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber">전화번호</label>
                <div className={styles.inputWithIcon}>
                  <FaPhone className={styles.icon} />
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.inputField}
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
                <small className={styles.helperText}>
                  연락 가능한 전화번호를 입력해주세요.
                </small>
              </div>

              <div className={styles.interestsGroup}>
                <label>현재 듣고 있는 강의</label>
                <p className={styles.helperText}>
                  현재 듣고 있는 강의를 선택해주세요. (선택)
                </p>

                <div className={styles.categoriesContainer}>
                  {renderProgramCategories()}
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handlePrevStep}
                >
                  이전
                </button>
                <button
                  type="submit"
                  className={styles.registerButton}
                  disabled={loading}
                >
                  {loading ? "가입 중..." : "회원가입 완료"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className={styles.loginLink}>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
