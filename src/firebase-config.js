// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYrHjUEA0iIv25xHkpM_nnkkIi-75D2kk",
  authDomain: "chungrakong-b3e52.firebaseapp.com",
  databaseURL: "https://chungrakong-b3e52-default-rtdb.firebaseio.com",
  projectId: "chungrakong-b3e52",
  storageBucket: "chungrakong-b3e52.firebasestorage.app",
  messagingSenderId: "246187288561",
  appId: "1:246187288561:web:9e4d567424c7d7c3830650",
  measurementId: "G-0BPCPLXE2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 알림 권한 요청 및 토큰 가져오기
export const requestPermission = async () => {
  console.log("Requesting notification permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    console.log("FCM Token:", token);
    return token;
  } else {
    console.error("Push notifications permission denied");
  }
};

// 메시지 수신 이벤트 리스너 설정
export const receiveMessage = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    alert(`알림: ${payload.notification.title}`);
  });
};