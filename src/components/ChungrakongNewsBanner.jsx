import React, { useState } from 'react';
import styles from '../styles/Chungrakong.module.css';
import festivalImage from '../assets/image/chungRaFestival3.jpg';
import logoImage from '../assets/image/chungRaKong.png';

export default function ChungrakongNewsBanner() {
  const [showAllMedia, setShowAllMedia] = useState(false);
  
  const mediaList = [
    { name: '인천뉴스', featured: true, url: 'https://www.incheonnews.com' },
    { name: '경제투데이', url: '#' },
    { name: '뉴스와이어', url: '#' },
    { name: '한국문화예술신문', url: '#' },
    { name: '스포츠피플타임즈', url: '#' },
    { name: '글로벌문화신문', url: '#' },
    { name: '기독교한국신문', url: '#' },
    { name: '국민기자뉴스', url: '#' },
    { name: '기업경제뉴스', url: '#' },
    { name: '예술방송인권신문', url: '#' },
    { name: '롤러타임즈', url: '#' },
    { name: '루트파인더스', url: '#' },
    { name: '부패방지뉴스', url: '#' },
    { name: '소비자불만119', url: '#' },
    { name: '우먼스토뉴스', url: '#' },
    { name: '김천일보', url: '#' }
  ];

  const displayedMedia = showAllMedia ? mediaList : mediaList.slice(0, 7);

  return (
    <div className={styles.container}>
      <div className={styles.pattern} />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logoArea}>
            <div className={styles.logoCircle}>
              <img 
  src={logoImage} 
  alt="청라콩 로고" 
  className={styles.logoImage}
/>
            </div>
            <div className={styles.brandName}>청라콩문화센터</div>
          </div>

          <div className={styles.badge}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>언론 보도</span>
          </div>

          <h1 className={styles.title}>
            청라콩문화센터 뉴스 보도기사<br />
          </h1>

          <p className={styles.subtitle}>
            <span className={styles.subtitleBold}>우리의 문화</span>가 <br />
            지역사회의 소식이 되었습니다.
          </p>

          <div className={styles.mediaSection}>
            <div className={styles.mediaLabel}>
              <span className={styles.mediaDot} />
              <span>16개 언론사 보도</span>
            </div>
            
            <div className={styles.mediaList}>
              {displayedMedia.map((media, idx) => {
                const mediaClass = media.featured 
                  ? `${styles.mediaItem} ${styles.mediaItemFeatured}` 
                  : `${styles.mediaItem} ${styles.mediaItemNormal}`;
                
                return (
                  <a key={idx}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mediaClass}
                  >
                    {media.name}
                  </a>
                );
              })}
            </div>

            {mediaList.length > 7 && (
              <button
                onClick={() => setShowAllMedia(!showAllMedia)}
                className={styles.moreButton}
                type="button"
              >
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showAllMedia ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
                <span>{showAllMedia ? '접기' : `+${mediaList.length - 7}개 더보기`}</span>
              </button>
            )}
          </div>

          <a href="#news" className={styles.ctaButton}>
            <span>기사 전체보기</span>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            {/* 실제 페스티벌 이미지를 여기에 넣으세요 */}
            <div 
              className={styles.imageBg}
              style={{
                backgroundImage: `url(${festivalImage})`
              }}
            />
            <div className={styles.imageOverlay} />
            <div className={styles.imageContent}>
              <div className={styles.imageCard}>
                <div className={styles.imageTitle}>
                  청라콩 MUSIC<br />FESTIVAL
                </div>
                <div className={styles.imageSubtitle}>
                  2025.09.27 SAT<br />
                  지역 주민과 함께한 따뜻한 문화 공간
                </div>
                <div className={styles.imageFooter}>
                  <div className={styles.footerDot} />
                  <span>16개 언론사 주목</span>
                </div>
              </div>
            </div>
            <div className={styles.badgeCorner}>
              <div className={styles.badgeNumber}>16</div>
              <div className={styles.badgeLabel}>언론사</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomLine} />
    </div>
  );
}