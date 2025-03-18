import { useState, useEffect } from "react";

export const useDarkMode = () => {
  // 로컬 스토리지에서 다크모드 상태 가져오기
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedMode = localStorage.getItem("darkMode");

    // 저장된 모드가 있으면 그 값 사용, 없으면 시스템 설정 확인
    if (savedMode !== null) {
      return savedMode === "true";
    }

    // 시스템 다크모드 설정 확인
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // 초기 실행 시 다크모드 상태 즉시 적용
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }

    // 시스템 다크모드 변경 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 다크모드 상태가 변경될 때마다 로컬 스토리지에 저장하고 HTML에 클래스 적용
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 로컬 스토리지에 저장
    localStorage.setItem("darkMode", isDarkMode);

    // document.documentElement(html 요소)에 클래스 적용
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
