import React, { useEffect } from "react";
import styles from "../styles/Login.module.css";

const KakaoLoginButton = ({ onLoginSuccess }) => {
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("03ee8389a145c671567733e07027c1dc");
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: (authObj) => {
        console.log("✅ 카카오 로그인 성공! 토큰:", authObj.access_token);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log("✅ 카카오 사용자 정보:", res);
            onLoginSuccess(res); // ✅ 로그인 성공 후 부모 컴포넌트로 전달
          },
          fail: (error) =>
            console.error("❌ 카카오 사용자 정보 요청 실패:", error),
        });
      },
      fail: (err) => console.error("❌ 카카오 로그인 실패:", err),
    });
  };

  return (
    <button onClick={handleKakaoLogin} className={styles.kakaoButton}>
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오 로그인"
        className={styles.kakaoLogo}
      />
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
