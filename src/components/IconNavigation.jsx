import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navItems";
import styles from "../styles/IconNavigation.module.css";

const IconNavigation = () => {
  const observerRefs = useRef([]);

  useEffect(() => {
    const currentRefs = observerRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 화면에 요소가 들어올 때
            if (entry.isIntersecting) {
              // 애니메이션 클래스 추가
              entry.target.classList.add(styles.visible);
            } else {
              // 화면에서 벗어날 때 애니메이션 클래스 제거
              entry.target.classList.remove(styles.visible);
            }
          });
        },
        {
          threshold: 0.2, // 20% 정도 보일 때 트리거
          rootMargin: "0px", // 뷰포트 기준
        }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <nav className={styles.iconNav}>
      <div className={styles.iconContainer}>
        {navItems.map(({ id, icon: Icon, label, isNew, path }, index) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `${styles.iconItem} ${isActive ? styles.active : ""} ${
                styles.scrollFade
              }`
            }
            style={{
              transitionDelay: `${index * 100}ms`, // 순차적 애니메이션을 위한 딜레이
            }}
            ref={(el) => (observerRefs.current[index] = el)}
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
