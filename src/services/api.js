// src/services/api.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

// 디버깅을 위한 로그
console.log("Firebase Firestore를 백엔드로 사용합니다.");

// 인증 관련 API
export const authAPI = {
  // 회원가입 - AuthContext에서 처리되므로 필요한 경우만 사용
  register: async (userData) => {
    try {
      console.log("Firestore를 사용한 회원가입 처리");
      // 대부분의 회원가입 로직은 AuthContext의 signup 함수에서 처리됨
      return { success: true, message: "회원가입이 완료되었습니다." };
    } catch (error) {
      console.error("회원가입 API 오류:", error);
      throw error;
    }
  },

  // 로그인 - AuthContext에서 처리되므로 필요한 경우만 사용
  login: async (credentials) => {
    try {
      console.log("Firestore를 사용한 로그인 처리");
      // 대부분의 로그인 로직은 AuthContext의 login 함수에서 처리됨
      return { success: true, message: "로그인이 완료되었습니다." };
    } catch (error) {
      console.error("로그인 API 오류:", error);
      throw error;
    }
  },

  // 카카오 로그인 - 필요한 경우에만 구현
  kakaoLogin: async (kakaoData) => {
    try {
      console.log("Firestore를 사용한 카카오 로그인 처리");
      // 카카오 로그인은 별도 구현 필요
      return { success: true, message: "카카오 로그인이 완료되었습니다." };
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
      const user = auth.currentUser;
      if (!user) throw new Error("인증된 사용자가 없습니다");

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("사용자 정보를 찾을 수 없습니다");
      }

      const userData = userDoc.data();
      // Timestamp 객체를 ISO 문자열로 변환
      const createdAt =
        userData.createdAt instanceof Timestamp
          ? userData.createdAt.toDate().toISOString()
          : userData.createdAt;
      const lastLogin =
        userData.lastLogin instanceof Timestamp
          ? userData.lastLogin.toDate().toISOString()
          : userData.lastLogin;

      return {
        ...userData,
        createdAt,
        lastLogin,
        id: user.uid,
      };
    } catch (error) {
      console.error("프로필 조회 API 오류:", error);
      throw error;
    }
  },

  // 프로필 업데이트
  updateProfile: async (userData) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("인증된 사용자가 없습니다");

      const userDocRef = doc(db, "users", user.uid);

      // 업데이트 데이터 준비
      const updateData = {
        ...userData,
        updatedAt: serverTimestamp(),
      };

      // 프로필 이미지는 별도 처리 필요 (Storage 사용)
      // 여기서는 URL로 간주
      if (userData.profileImage && !(userData.profileImage instanceof File)) {
        updateData.profileImage = userData.profileImage;
      }

      await updateDoc(userDocRef, updateData);
      return {
        success: true,
        message: "프로필이 업데이트되었습니다",
        user: {
          ...updateData,
          uid: user.uid,
        },
      };
    } catch (error) {
      console.error("프로필 업데이트 API 오류:", error);
      throw error;
    }
  },

  // 비밀번호 변경
  changePassword: async (passwordData) => {
    try {
      // Firebase Authentication의 비밀번호 변경 기능 사용 필요
      // 여기서는 기능이 구현되어 있지 않으므로 메시지만 반환
      return {
        success: true,
        message: "비밀번호 변경 기능이 아직 구현되지 않았습니다.",
      };
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
      const usersCollection = collection(db, "users");
      const usersQuery = query(usersCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(usersQuery);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        // Timestamp 객체를 ISO 문자열로 변환
        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : data.createdAt;
        const lastLogin =
          data.lastLogin instanceof Timestamp
            ? data.lastLogin.toDate().toISOString()
            : data.lastLogin;

        return {
          id: doc.id,
          ...data,
          createdAt,
          lastLogin,
        };
      });
    } catch (error) {
      console.error("사용자 목록 가져오기 오류:", error);
      throw error;
    }
  },

  // 사용자 정보 업데이트 (관리자 권한)
  updateUser: async (userId, userData) => {
    try {
      const userDocRef = doc(db, "users", userId);

      // 현재 데이터 가져오기
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("사용자를 찾을 수 없습니다");
      }

      // 업데이트 데이터 준비
      const updateData = {
        ...userData,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(userDocRef, updateData);
      return {
        success: true,
        message: "사용자 정보가 업데이트되었습니다",
        user: {
          id: userId,
          ...updateData,
        },
      };
    } catch (error) {
      console.error("사용자 정보 업데이트 오류:", error);
      throw error;
    }
  },

  // 사용자 삭제 (관리자 권한)
  deleteUser: async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      return { success: true, message: "사용자가 삭제되었습니다" };
    } catch (error) {
      console.error("사용자 삭제 오류:", error);
      throw error;
    }
  },

  // 대시보드 통계 가져오기
  getDashboardStats: async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const users = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      // 한 달 내 가입한 사용자 수 계산
      const now = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const newUsers = users.filter((user) => {
        let createdAt;
        if (user.createdAt instanceof Timestamp) {
          createdAt = user.createdAt.toDate();
        } else if (typeof user.createdAt === "string") {
          createdAt = new Date(user.createdAt);
        } else {
          createdAt = new Date(); // 기본값
        }
        return createdAt > oneMonthAgo;
      });

      // 월별 등록 사용자 수 계산 (최근 12개월)
      const registrationsByMonth = [];
      for (let i = 0; i < 12; i++) {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        monthEnd.setDate(0);
        monthEnd.setHours(23, 59, 59, 999);

        const monthUsers = users.filter((user) => {
          let createdAt;
          if (user.createdAt instanceof Timestamp) {
            createdAt = user.createdAt.toDate();
          } else if (typeof user.createdAt === "string") {
            createdAt = new Date(user.createdAt);
          } else {
            return false;
          }
          return createdAt >= monthStart && createdAt <= monthEnd;
        });

        const monthName = monthStart.toLocaleString("ko-KR", { month: "long" });
        registrationsByMonth.push({
          month: `${monthName}`,
          count: monthUsers.length,
        });
      }

      return {
        totalUsers: users.length,
        newUsersThisMonth: newUsers.length,
        adminCount: users.filter((user) => user.isAdmin).length,
        kakaoUsers: users.filter((user) => user.provider === "kakao").length,
        emailUsers: users.filter((user) => user.provider !== "kakao").length,
        registrationsByMonth: registrationsByMonth.reverse(),
        userStatus: [
          {
            status: "활성",
            count: users.filter((u) => u.status !== "inactive").length,
          },
          {
            status: "비활성",
            count: users.filter((u) => u.status === "inactive").length,
          },
        ],
      };
    } catch (error) {
      console.error("통계 데이터 가져오기 오류:", error);
      throw error;
    }
  },
};

// 프로그램 관련 API
export const programAPI = {
  // 모든 프로그램 가져오기
  getAllPrograms: async () => {
    try {
      const programsCollection = collection(db, "programs");
      const snapshot = await getDocs(programsCollection);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("프로그램 목록 가져오기 오류:", error);
      throw error;
    }
  },

  // 프로그램 상세 정보 가져오기
  getProgramById: async (programId) => {
    try {
      const programDocRef = doc(db, "programs", programId);
      const programDoc = await getDoc(programDocRef);

      if (!programDoc.exists()) {
        throw new Error("프로그램을 찾을 수 없습니다");
      }

      return {
        id: programDoc.id,
        ...programDoc.data(),
      };
    } catch (error) {
      console.error("프로그램 상세 정보 가져오기 오류:", error);
      throw error;
    }
  },

  // 새 프로그램 추가
  addProgram: async (programData) => {
    try {
      const programsCollection = collection(db, "programs");
      const docRef = await addDoc(programsCollection, {
        ...programData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...programData,
      };
    } catch (error) {
      console.error("프로그램 추가 오류:", error);
      throw error;
    }
  },

  // 프로그램 업데이트
  updateProgram: async (programId, programData) => {
    try {
      const programDocRef = doc(db, "programs", programId);

      await updateDoc(programDocRef, {
        ...programData,
        updatedAt: serverTimestamp(),
      });

      return { success: true, message: "프로그램이 업데이트되었습니다" };
    } catch (error) {
      console.error("프로그램 업데이트 오류:", error);
      throw error;
    }
  },

  // 프로그램 삭제
  deleteProgram: async (programId) => {
    try {
      const programDocRef = doc(db, "programs", programId);
      await deleteDoc(programDocRef);

      return { success: true, message: "프로그램이 삭제되었습니다" };
    } catch (error) {
      console.error("프로그램 삭제 오류:", error);
      throw error;
    }
  },
};

// 수강신청 관련 API
export const enrollmentAPI = {
  // 사용자의 모든 수강신청 정보 가져오기
  getUserEnrollments: async (userId) => {
    try {
      const enrollmentsCollection = collection(db, "enrollments");
      const q = query(enrollmentsCollection, where("userId", "==", userId));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("수강신청 정보 가져오기 오류:", error);
      throw error;
    }
  },

  // 수강신청하기
  createEnrollment: async (enrollmentData) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("인증된 사용자가 없습니다");

      const enrollmentsCollection = collection(db, "enrollments");
      const docRef = await addDoc(enrollmentsCollection, {
        ...enrollmentData,
        userId: user.uid,
        status: "pending", // 대기중, approved(승인됨), rejected(거부됨)
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...enrollmentData,
        userId: user.uid,
      };
    } catch (error) {
      console.error("수강신청 오류:", error);
      throw error;
    }
  },

  // 수강신청 상태 변경 (관리자)
  updateEnrollmentStatus: async (enrollmentId, status) => {
    try {
      const enrollmentDocRef = doc(db, "enrollments", enrollmentId);

      await updateDoc(enrollmentDocRef, {
        status,
        updatedAt: serverTimestamp(),
      });

      return { success: true, message: "수강신청 상태가 업데이트되었습니다" };
    } catch (error) {
      console.error("수강신청 상태 변경 오류:", error);
      throw error;
    }
  },
};

// 공지사항 관련 API
export const noticeAPI = {
  // 모든 공지사항 가져오기
  getAllNotices: async () => {
    try {
      const noticesCollection = collection(db, "notices");
      const q = query(noticesCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : data.createdAt;

        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });
    } catch (error) {
      console.error("공지사항 목록 가져오기 오류:", error);
      throw error;
    }
  },

  // 공지사항 추가 (관리자)
  createNotice: async (noticeData) => {
    try {
      const noticesCollection = collection(db, "notices");
      const docRef = await addDoc(noticesCollection, {
        ...noticeData,
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...noticeData,
      };
    } catch (error) {
      console.error("공지사항 추가 오류:", error);
      throw error;
    }
  },

  // 공지사항 업데이트 (관리자)
  updateNotice: async (noticeId, noticeData) => {
    try {
      const noticeDocRef = doc(db, "notices", noticeId);

      await updateDoc(noticeDocRef, {
        ...noticeData,
        updatedAt: serverTimestamp(),
      });

      return { success: true, message: "공지사항이 업데이트되었습니다" };
    } catch (error) {
      console.error("공지사항 업데이트 오류:", error);
      throw error;
    }
  },

  // 공지사항 삭제 (관리자)
  deleteNotice: async (noticeId) => {
    try {
      const noticeDocRef = doc(db, "notices", noticeId);
      await deleteDoc(noticeDocRef);

      return { success: true, message: "공지사항이 삭제되었습니다" };
    } catch (error) {
      console.error("공지사항 삭제 오류:", error);
      throw error;
    }
  },
};
// api.js에 추가할 코드
// 문의 관련 API
export const inquiryAPI = {
  // 모든 문의 목록 가져오기
  getAllInquiries: async () => {
    try {
      const inquiriesCollection = collection(db, "inquiries");
      const q = query(inquiriesCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        // Timestamp 객체를 ISO 문자열로 변환
        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : data.createdAt;
        const updatedAt =
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt;

        return {
          id: doc.id,
          ...data,
          createdAt,
          updatedAt,
        };
      });
    } catch (error) {
      console.error("문의 목록 가져오기 오류:", error);
      throw error;
    }
  },

  // 문의 상세 정보 가져오기
  getInquiryById: async (inquiryId) => {
    try {
      const inquiryDocRef = doc(db, "inquiries", inquiryId);
      const inquiryDoc = await getDoc(inquiryDocRef);

      if (!inquiryDoc.exists()) {
        throw new Error("문의를 찾을 수 없습니다");
      }

      const data = inquiryDoc.data();
      // Timestamp 객체를 ISO 문자열로 변환
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : data.createdAt;
      const updatedAt =
        data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt;

      return {
        id: inquiryDoc.id,
        ...data,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      console.error("문의 상세 정보 가져오기 오류:", error);
      throw error;
    }
  },

  // 새 문의 추가하기
 // inquiryAPI.createInquiry 메서드
createInquiry: async (inquiryData) => {
  const inquiriesCollection = collection(db, "inquiries");
  const snapshot = await getDocs(inquiriesCollection);
  const sequenceNumber = snapshot.size + 1;

  return await addDoc(inquiriesCollection, {
    ...inquiryData,
    sequenceNumber,
    status: "대기중",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
},

  // 문의 답변 등록/수정하기
  updateInquiryResponse: async (inquiryId, responseData) => {
    try {
      const inquiryRef = doc(db, "inquiries", inquiryId);
      await updateDoc(inquiryRef, {
        response: responseData.response,
        status: responseData.status || "답변완료",
        updatedAt: serverTimestamp(),
      });

      // 업데이트된 문의 정보 가져오기
      const updatedDoc = await getDoc(inquiryRef);
      const data = updatedDoc.data();

      // Timestamp 객체를 ISO 문자열로 변환
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : data.createdAt;
      const updatedAt =
        data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt;

      return {
        id: updatedDoc.id,
        ...data,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      console.error("답변 등록/수정 오류:", error);
      throw error;
    }
  },

  // 문의 삭제하기
  deleteInquiry: async (inquiryId) => {
    try {
      await deleteDoc(doc(db, "inquiries", inquiryId));
      return { success: true, message: "문의가 삭제되었습니다" };
    } catch (error) {
      console.error("문의 삭제 오류:", error);
      throw error;
    }
  },
};
