// utils/apiService.js
const API_BASE_URL = "https://chungrakongback.onrender.com/api";

const apiService = {
  // 프로그램 수강신청 제출
  submitApplication: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "신청 처리 중 오류가 발생했습니다",
          userMessage: data.message || "신청 처리 중 오류가 발생했습니다",
        };
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw {
        status: error.status || 500,
        message: error.message || "서버와 통신 중 오류가 발생했습니다",
        userMessage:
          error.userMessage || "서버와의 통신 중 오류가 발생했습니다",
      };
    }
  },

  // 문의사항 제출
  submitContact: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "문의 처리 중 오류가 발생했습니다",
          userMessage: data.message || "문의 처리 중 오류가 발생했습니다",
        };
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw {
        status: error.status || 500,
        message: error.message || "서버와 통신 중 오류가 발생했습니다",
        userMessage:
          error.userMessage || "서버와의 통신 중 오류가 발생했습니다",
      };
    }
  },

  // 신청 목록 조회 (관리자용)
  getApplications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "신청 목록 조회 중 오류가 발생했습니다",
          userMessage: data.message || "신청 목록을 불러올 수 없습니다",
        };
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw {
        status: error.status || 500,
        message: error.message || "서버와 통신 중 오류가 발생했습니다",
        userMessage:
          error.userMessage || "서버와의 통신 중 오류가 발생했습니다",
      };
    }
  },
};

export default apiService;
