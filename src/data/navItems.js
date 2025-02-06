// src/data/navItems.js
import {
  FaTrophy,
  FaGuitar,
  FaMicrophone,
  FaDrum,
  FaChalkboardTeacher,
  FaRegBookmark,
  FaCode,
  FaHeartbeat,
  FaLanguage,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

export const navItems = [
  { id: 1, icon: FaTrophy, label: "실시간 랭킹", path: "/ranking" },
  { id: 2, icon: FaGuitar, label: "음악 클래스", path: "/music", isNew: true },
  { id: 3, icon: FaMicrophone, label: "보컬", path: "/program/2" },
  { id: 4, icon: FaDrum, label: "드럼", path: "/program/12" },
  { id: 5, icon: FaLanguage, label: "영어회화", path: "/program/5" },
  { id: 6, icon: FaChalkboardTeacher, label: "강사진", path: "/teachers" },
  { id: 7, icon: FaCode, label: "코딩", path: "/program/7" },
  { id: 8, icon: FaHeartbeat, label: "필라테스", path: "/program/1" },
  { id: 9, icon: FaRegBookmark, label: "처음이신가요?", path: "/about" },
  { id: 10, icon: IoPeople, label: "커뮤니티", path: "/community" },
];
