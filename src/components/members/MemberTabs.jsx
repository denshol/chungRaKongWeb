// components/members/MemberTabs.jsx
import React from "react";
import styles from "../../styles/AdminDashboard.module.css";

const MemberTabs = ({ activeMemberTab, setActiveMemberTab }) => {
  const tabs = [
    {
      id: "전체 회원",
      label: "전체 회원",
    },
    {
      id: "활성 회원",
      label: "활성 회원",
    },
    {
      id: "휴면 회원",
      label: "휴면 회원",
    },
    {
      id: "정지 회원",
      label: "정지 회원",
    },
  ];

  return (
    <div className={styles.memberTabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.memberTab} ${
            activeMemberTab === tab.id ? styles.memberTabActive : ""
          }`}
          onClick={() => setActiveMemberTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MemberTabs;
