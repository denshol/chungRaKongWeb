import React from "react";
import styles from "../styles/Ranking.module.css";

const rankingData = [
  { id: 1, title: "프로그램 A", score: 98, description: "최고의 프로그램" },
  { id: 2, title: "프로그램 B", score: 95, description: "훌륭한 프로그램" },
  {
    id: 3,
    title: "프로그램 C",
    score: 92,
    description: "매우 인기있는 프로그램",
  },
  {
    id: 4,
    title: "프로그램 D",
    score: 90,
    description: "고객 만족도가 높은 프로그램",
  },
  { id: 5, title: "프로그램 E", score: 88, description: "추천하는 프로그램" },
];

const Ranking = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>실시간 랭킹</h1>
      <ul className={styles.list}>
        {rankingData.map((item, index) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.rankNumber}>{index + 1}</div>
            <div className={styles.info}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
            <div className={styles.score}>{item.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
