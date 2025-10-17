import React, { useState } from 'react';
import styles from '../styles/Chungrakong.module.css';
import festivalImage from '../assets/image/chungRaFestival3.jpg';
import logoImage from '../assets/image/chungRaKong.png';

export default function ChungrakongNewsBanner() {
  const [showAllMedia, setShowAllMedia] = useState(false);
  
  const mediaList = [
    { name: '인천뉴스', featured: true, url: 'https://www.incheonnews.com' },
    { name: '경제투데이', url: 'https://www.e-today.kr/news/articleView.html?idxno=839648' },
    { name: '뉴스와이어', url: 'https://www.newswire.co.kr/newsRead.php?no=1020131' },
    { name: '한국문화예술신문', url: 'http://www.kcan.kr/bbs/board.php?bo_table=B14&wr_id=4007' },
    { name: '스포츠피플타임즈', url: 'https://www.sportpeopletimes.com/news/articleView.html?idxno=16693' },
    { name: '글로벌문화신문', url: 'http://www.sscn.co.kr/news/view.php?no=29401' },
    { name: '기독교한국신문', url: 'http://www.cknews.co.kr/_press/?newsid=1020131' },
    { name: '국민기자뉴스', url: 'https://www.kmkj.kr/news/articleView.html?idxno=86358' },
    { name: '기업경제뉴스', url: 'https://www.corporateeconomic.com/news/articleView.html?idxno=45850' },
    { name: '예술방송인권신문', url: 'https://www.artstv.kr/news/articleView.html?idxno=171265' },
    { name: '롤러타임즈', url: 'https://www.rollertimes.co.kr/news/articleView.html?idxno=358' },
    { name: '루트파인더스', url: 'https://www.routefinders.co.kr/news/articleView.html?idxno=8546' },
    { name: '부패방지뉴스', url: 'https://www.bbnnews.co.kr/news/articleView.html?idxno=44667' },
    { name: '소비자불만119', url: 'http://www.sbj119.co.kr/news/view.php?no=72605' },
    { name: '우먼스토리뉴스', url: 'http://www.woman-story.co.kr/news/articleView.html?idxno=10535' },
    { name: '김천일보', url: 'https://www.gcilbo.kr/news/articleView.html?idxno=90889' }
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

          

          <h1 className={styles.title} style={{ marginBottom: '4px' }}>
            청라콩문화센터 뉴스 보도기사<br />
          </h1>

          <p className={styles.subtitle}>
            <span className={styles.subtitleBold}></span>지역주민과 함께한 따뜻하고 행복한 시간 <br />
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
            {/* <div className={styles.imageContent}>
              <div className={styles.imageCard}>
                <div className={styles.imageTitle}>
                  청라콩 문화센터
                </div>
                <div className={styles.imageSubtitle}>
                  2025.09.27 SAT<br />
                  지역 주민과 함께한 따뜻한 문화 공간
                </div>
                
              </div>
            </div> */}
            
          </div>
        </div>
      </div>

      <div className={styles.bottomLine} />
    </div>
  );
}