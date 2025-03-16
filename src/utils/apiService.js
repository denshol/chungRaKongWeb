// src/utils/apiService.js
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_URL =
  process.env.REACT_APP_API_URL || "https://chungrakongback.onrender.com";

// 기본 타임아웃 설정 (15초)
const DEFAULT_TIMEOUT = 15000;

// 재시도 횟수 및 지연 설정
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1초

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 처리
    console.log(`API 요청: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    // 요청 에러 처리
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => {
    // 응답 처리
    console.log(`API 응답: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    // 응답 에러 처리
    console.error("API 응답 에러:", error);

    // 요청 설정 및 재시도 횟수 확인
    const { config } = error;

    // 재시도 횟수 확인 (초기값은 undefined)
    const retryCount = config._retryCount || 0;

    // 네트워크 에러이고 최대 재시도 횟수보다 적게 시도했으면 재시도
    if (
      (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") &&
      retryCount < MAX_RETRIES
    ) {
      // 재시도 횟수 증가
      config._retryCount = retryCount + 1;

      console.log(
        `API 요청 재시도 (${config._retryCount}/${MAX_RETRIES}): ${config.url}`
      );

      // 지연 후 재시도
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiClient(config));
        }, RETRY_DELAY * retryCount); // 재시도 횟수에 따라 지연 시간 증가
      });
    }

    // 사용자 친화적인 에러 메시지 생성
    let userMessage = "요청 처리 중 오류가 발생했습니다.";

    if (error.code === "ECONNABORTED") {
      userMessage =
        "요청 시간이 초과되었습니다. 서버 응답이 지연되고 있습니다.";
    } else if (error.code === "ERR_NETWORK") {
      userMessage = "네트워크 연결을 확인해주세요. 서버에 접속할 수 없습니다.";
    } else if (error.response) {
      // HTTP 상태 코드에 따른 메시지
      const status = error.response.status;

      if (status === 400) {
        userMessage = "요청에 오류가 있습니다. 입력 정보를 확인해주세요.";
      } else if (status === 401) {
        userMessage = "인증이 필요합니다. 다시 로그인해주세요.";
      } else if (status === 403) {
        userMessage = "접근 권한이 없습니다.";
      } else if (status === 404) {
        userMessage = "요청한 리소스를 찾을 수 없습니다.";
      } else if (status === 500) {
        userMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else {
        userMessage = `서버 오류가 발생했습니다(${status}). 잠시 후 다시 시도해주세요.`;
      }

      // 서버에서 에러 메시지를 보냈으면 그것을 사용
      if (error.response.data && error.response.data.message) {
        userMessage = error.response.data.message;
      }
    }

    // 에러 객체에 사용자 메시지 추가
    error.userMessage = userMessage;

    return Promise.reject(error);
  }
);

// API 요청 함수들
const apiService = {
  // 프로그램 신청 제출
  submitApplication: async (formData) => {
    try {
      const response = await apiClient.post("/api/applications", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 문의하기 제출
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post("/api/contact", contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 프로그램 신청 목록 조회 (관리자용)
  getApplications: async () => {
    try {
      const response = await apiClient.get("/api/applications");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 문의 목록 조회 (관리자용)
  getContacts: async () => {
    try {
      const response = await apiClient.get("/api/contact");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
