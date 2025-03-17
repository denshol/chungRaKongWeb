// src/services/api.js

// API URL 구성 - /api 경로 추가 확인
const baseUrl =
  process.env.REACT_APP_API_URL || "https://chungrakongback.onrender.com";
const API_URL = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

// 디버깅을 위한 로그
console.log("기본 URL:", baseUrl);
console.log("최종 API URL:", API_URL);

// 인증 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 인증 관련 API
export const authAPI = {
  // 회원가입
  register: async (userData) => {
    const url = `${API_URL}/auth/register`;
    console.log("회원가입 요청 URL:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: userData, // FormData 객체 그대로 전송
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입 중 오류가 발생했습니다.");
      }

      return data;
    } catch (error) {
      console.error("회원가입 API 오류:", error);
      throw error;
    }
  },

  // 로그인
  // authAPI.login 함수 부분만 수정
  login: async (credentials) => {
    const url = `${API_URL}/auth/login`;
    console.log("로그인 요청 URL:", url);
    console.log("로그인 요청 데이터:", credentials);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("응답 상태:", response.status);

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();
      console.log("응답 데이터:", data);

      if (!response.ok) {
        throw new Error(data.message || "로그인 중 오류가 발생했습니다.");
      }

      return data;
    } catch (error) {
      console.error("로그인 API 오류:", error);
      throw error;
    }
  },

  // 카카오 로그인
  kakaoLogin: async (kakaoData) => {
    const url = `${API_URL}/auth/kakao`;
    console.log("카카오 로그인 요청 URL:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kakaoData),
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "소셜 로그인 중 오류가 발생했습니다.");
      }

      return data;
    } catch (error) {
      console.error("카카오 로그인 API 오류:", error);
      throw error;
    }
  },
};

// 사용자 관련 API
export const userAPI = {
  // 프로필 정보 가져오기
  getProfile: async () => {
    const url = `${API_URL}/user/profile`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "프로필 정보를 가져오는 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("프로필 조회 API 오류:", error);
      throw error;
    }
  },

  // 프로필 업데이트
  updateProfile: async (userData) => {
    const url = `${API_URL}/user/profile`;

    try {
      // FormData는 파일 업로드를 위해 사용
      const formData = new FormData();

      // userData에서 각 필드를 formData에 추가
      Object.keys(userData).forEach((key) => {
        if (key === "profileImage" && userData[key] instanceof File) {
          formData.append(key, userData[key]);
        } else if (key !== "profileImage" || userData[key] !== null) {
          formData.append(key, userData[key]);
        }
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "프로필 업데이트 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("프로필 업데이트 API 오류:", error);
      throw error;
    }
  },

  // 비밀번호 변경
  changePassword: async (passwordData) => {
    const url = `${API_URL}/user/change-password`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(passwordData),
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "비밀번호 변경 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("비밀번호 변경 API 오류:", error);
      throw error;
    }
  },
};

// 관리자 관련 API
export const adminAPI = {
  // 모든 사용자 목록 가져오기
  getAllUsers: async () => {
    const url = `${API_URL}/admin/users`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "사용자 목록을 가져오는 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("사용자 목록 조회 API 오류:", error);
      throw error;
    }
  },

  // 사용자 정보 업데이트 (관리자 권한)
  updateUser: async (userId, userData) => {
    const url = `${API_URL}/admin/users/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(userData),
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "사용자 정보 업데이트 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("사용자 업데이트 API 오류:", error);
      throw error;
    }
  },

  // 사용자 삭제 (관리자 권한)
  deleteUser: async (userId) => {
    const url = `${API_URL}/admin/users/${userId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "사용자 삭제 중 오류가 발생했습니다.");
      }

      return data;
    } catch (error) {
      console.error("사용자 삭제 API 오류:", error);
      throw error;
    }
  },

  // 대시보드 통계 가져오기
  getDashboardStats: async () => {
    const url = `${API_URL}/admin/stats`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

      // 응답이 JSON이 아닐 경우를 대비
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("서버 응답이 JSON이 아닙니다:", text);
        throw new Error("서버에서 유효한 응답을 받지 못했습니다.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "통계 데이터를 가져오는 중 오류가 발생했습니다."
        );
      }

      return data;
    } catch (error) {
      console.error("통계 데이터 조회 API 오류:", error);
      throw error;
    }
  },
};
