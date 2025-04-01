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
  FaGlobeAmericas,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

export const navItems = [
  { id: 1, icon: FaTrophy, label: "실시간랭킹", path: "/ranking" },
  { id: 2, icon: FaGuitar, label: "음악 클래스", path: "/music", isNew: true },
  { id: 3, icon: FaMicrophone, label: "보컬", path: "/program/2" },
  { id: 4, icon: FaDrum, label: "드럼", path: "/program/7" },
  { id: 5, icon: FaLanguage, label: "영어회화", path: "/program/9" },
  // {
  //   id: 6,
  //   icon: FaChalkboardTeacher,
  //   label: "영상\n강의",
  //   path: "/video-lectures",
  // },
  {
    id: 7,
    icon: FaGlobeAmericas,
    label: "어학연수\n",
    path: "/study-abroad",
    isNew: true,
  },
  { id: 8, icon: FaCode, label: "코딩", path: "/program/14" },
  { id: 9, icon: FaHeartbeat, label: "필라테스", path: "/program/1" },
  { id: 10, icon: FaRegBookmark, label: "처음\n이신가요?", path: "/about" },
  { id: 11, icon: IoPeople, label: "문의신청", path: "/contact" },
];
