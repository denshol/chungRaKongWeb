// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging.js');

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

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
    }
  );
});
