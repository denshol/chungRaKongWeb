// src/components/auth/KakaoLoginButton.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";
import styles from "../../styles/Auth.module.css";

const KakaoLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // 카카오 SDK 로드
  useEffect(() => {
    const loadKakaoSDK = () => {
      // SDK가 이미 로드되어 있는지 확인
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          // 실제로는 환경 변수나 설정 파일에서 앱 키를 가져옵니다
          const appKey =
            process.env.REACT_APP_KAKAO_APP_KEY || "YOUR_KAKAO_APP_KEY";
          window.Kakao.init(appKey);
          console.log("카카오 SDK 초기화 완료");
        }
        return;
      }

      // SDK 스크립트 로드
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          const appKey =
            process.env.REACT_APP_KAKAO_APP_KEY || "YOUR_KAKAO_APP_KEY";
          window.Kakao.init(appKey);
          console.log("카카오 SDK 초기화 완료");
        }
      };
      script.onerror = () => {
        console.error("카카오 SDK 로드 실패");
        setError("카카오 로그인을 위한 준비 중 오류가 발생했습니다.");
      };
      document.body.appendChild(script);
    };

    loadKakaoSDK();
  }, []);

  // 카카오 로그인 처리
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      setError(
        "카카오 로그인을 위한 준비 중입니다. 잠시 후 다시 시도해 주세요."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email",
      success: async (authObj) => {
        try {
          // 사용자 정보 요청
          const kakaoUserInfo = await new Promise((resolve, reject) => {
            window.Kakao.API.request({
              url: "/v2/user/me",
              success: (res) => resolve(res),
              fail: (error) => reject(error),
            });
          });

          console.log("✅ 카카오 사용자 정보:", kakaoUserInfo);

          // 백엔드 API로 카카오 로그인 처리 요청
          const kakaoData = {
            kakaoToken: authObj.access_token,
            kakaoId: kakaoUserInfo.id,
            email: kakaoUserInfo.kakao_account?.email,
            name: kakaoUserInfo.properties.nickname,
            profileImage: kakaoUserInfo.properties.profile_image,
          };

          const data = await authAPI.kakaoLogin(kakaoData);

          // 로그인 처리
          login(data.user, data.token);

          // 홈으로 리다이렉트
          navigate("/");
        } catch (error) {
          console.error("❌ 카카오 로그인 처리 중 오류:", error);
          setError(
            error.message || "카카오 로그인 처리 중 오류가 발생했습니다."
          );
        } finally {
          setIsLoading(false);
        }
      },
      fail: (error) => {
        console.error("❌ 카카오 로그인 실패:", error);
        setError("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
        setIsLoading(false);
      },
    });
  };

  return (
    <div className={styles.kakaoLoginWrapper}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button
        onClick={handleKakaoLogin}
        className={styles.kakaoButton}
        disabled={isLoading}
      >
        {isLoading ? (
          "로그인 중..."
        ) : (
          <>
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
              alt="카카오 로그인"
              className={styles.kakaoLogo}
            />
            카카오 로그인
          </>
        )}
      </button>
    </div>
  );
};

export default KakaoLoginButton;
