import React from "react";
import { navItems } from "../data/navItems";
import styles from "../styles/IconNavigation.module.css";

const IconNavigation = () => {
  return (
    <nav className={styles.iconNav}>
      <div className={styles.iconContainer}>
        {navItems.map(({ id, icon: Icon, label, isNew, path }) => (
          <a
            key={id}
            href={path}
            className={styles.iconItem}
            aria-label={label}
          >
            <div className={styles.iconWrapper}>
              <Icon /> {/* 여기서 Icon을 JSX로 렌더링 */}
              {isNew && <span className={styles.newBadge}>New</span>}
            </div>
            <span className={styles.iconLabel}>{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default IconNavigation;
