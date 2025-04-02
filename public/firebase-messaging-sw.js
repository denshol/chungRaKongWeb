// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAYrHjUEA0iIv25xHkpM_nnkkIi-75D2kk",
  authDomain: "chungrakong-b3e52.firebaseapp.com",
  databaseURL: "https://chungrakong-b3e52-default-rtdb.firebaseio.com",
  projectId: "chungrakong-b3e52",
  storageBucket: "chungrakong-b3e52.appspot.com",
  messagingSenderId: "246187288561",
  appId: "1:246187288561:web:9e4d567424c7d7c3830650",
  measurementId: "G-0BPCPLXE2Y"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지:', payload);
  const notificationTitle = payload.notification?.title || "새 알림";
  const notificationOptions = {
    body: payload.notification?.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
