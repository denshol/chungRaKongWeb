// src/components/IconNavigation.js
import React from "react";
import { navItems } from "../data/navItems";
import styles from "../styles/IconNavigation.module.css";

const IconNavigation = () => {
  return (
    <nav className={styles.iconNav}>
      <div className={styles.iconContainer}>
        {navItems.map(({ id, icon: Icon, label, isNew, path }) => (
          <a key={id} href={path} className={styles.iconItem}>
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} />
              {isNew && <span className={styles.newBadge}>New</span>}
            </div>
            <span className={styles.iconLabel}>{label}</span>
          </a>
        ))}
      </div>
      <div className={styles.customerCenter}>
        <a href="tel:0234481770" className={styles.customerPhone}>
          문의 010.8006.1715
        </a>
        <p className={styles.customerHours}>
          월12~22시/토12~19시 전화상담 가능(일요일 휴무)
        </p>
      </div>
    </nav>
  );
};

export default IconNavigation;
