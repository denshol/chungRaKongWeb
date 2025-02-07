import React from "react";
import { NavLink } from "react-router-dom"; // ✅ NavLink 사용
import { navItems } from "../data/navItems";
import styles from "../styles/IconNavigation.module.css";

const IconNavigation = () => {
  return (
    <nav className={styles.iconNav}>
      <div className={styles.iconContainer}>
        {navItems.map(({ id, icon: Icon, label, isNew, path }) => (
          <NavLink
            key={id}
            to={path} // ✅ href → to 로 변경
            className={({ isActive }) =>
              `${styles.iconItem} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.iconWrapper}>
              <Icon className={styles.icon} />
              {isNew && <span className={styles.newBadge}>New</span>}
            </div>
            <span className={styles.iconLabel}>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default IconNavigation;
