import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Programs.module.css";
import { programs } from "../data/programs";

const Programs = React.memo(() => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateTitle);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-50px 0px",
      }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateCard);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-20px 0px",
      }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    cardRefs.current.forEach((card, index) => {
      if (card) {
        card.style.setProperty("--delay", `${index * 100}ms`);
        cardObserver.observe(card);
      }
    });

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.programsContainer}>
      <h1 className={styles.programsTitle} ref={titleRef}>
        Program
      </h1>
      <div className={styles.programsGrid}>
        {programs.map((program, index) => (
          <Link
            to={`/program/${program.id}`}
            className={styles.programCard}
            key={program.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className={styles.programImageContainer}>
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                width="300"
                height="200"
              />
              <div className={styles.programBadge}>{program.price}</div>
            </div>
            <div className={styles.programContent}>
              <h3 className={styles.programTitle}>{program.title}</h3>
              <p className={styles.programDescription}>{program.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default Programs;
