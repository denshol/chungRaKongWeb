// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3XqW2KvZcOv9Gqla7kaIQgr41CbUwYYs",
  authDomain: "chungrakongweb.firebaseapp.com",
  projectId: "chungrakongweb",
  storageBucket: "chungrakongweb.appspot.com",
  messagingSenderId: "438832825675",
  appId: "1:438832825675:web:c846ad492911cb8a5c54ce",
  measurementId: "G-L7XZLEH50Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
