// src/services/api.js

const API_URL =
  process.env.REACT_APP_API_URL || "https://chungrakongback.onrender.com/api";

// 인증 토큰을 헤더에 추가하는 함수
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 인증 관련 API
export const authAPI = {
  // 회원가입
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: userData, // FormData 객체 그대로 전송
      });

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
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

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
    try {
      const response = await fetch(`${API_URL}/auth/kakao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kakaoData),
      });

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
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

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

      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });

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
    try {
      const response = await fetch(`${API_URL}/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(passwordData),
      });

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
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

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
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(userData),
      });

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
    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });

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
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        method: "GET",
        headers: {
          ...getAuthHeader(),
        },
      });

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
