// src/data/programs.js - 개선된 버전

// 이미지 자동 임포트를 위한 유틸리티 함수
const importProgramImages = () => {
  // 썸네일 이미지
  const thumbnails = {
    band: require("../assets/image/programImages/chungRaBand2.png"),
    bass: require("../assets/image/programImages/chungRaBass.png"),
    cajon: require("../assets/image/programImages/chungRaCajon.png"),
    chorus: require("../assets/image/programImages/chungRaChorus.png"),
    coding: require("../assets/image/programImages/chungRaCoding.png"),
    drum: require("../assets/image/programImages/chungRaDrum.png"),
    eng: require("../assets/image/programDetails/chungRaEng.png"),
    elec: require("../assets/image/programImages/chungRaElec2.png"),
    guitar: require("../assets/image/programImages/chungRaGuitar4.jpg"),
    piano: require("../assets/image/programImages/chungRaPiano.png"),
    pilates: require("../assets/image/programDetails/PilatesTeacher2.jpg"),
    ukulele: require("../assets/image/programImages/chungRaUkulele.png"),
    vocal: require("../assets/image/programImages/chungRaVocal.png"),
    violin: require("../assets/image/programDetails/chungRaViolin.jpg"),
    chelo: require("../assets/image/programDetails/chungRaCheloThumb.jpg"),
    electric: require("../assets/image/programDetails/chungRaElectric.jpg"),
    physical: require("../assets/image/programDetails/chungRaPhysical.jpg"),
    ccm: require("../assets/image/programImages/chungRaworship.jpg"),
  };

  // 상세 이미지
  const details = {
    band: require("../assets/image/programDetails/chungRaBand.jpg"),
    bass: require("../assets/image/programDetails/chungRaBass.jpg"),
    cajon: require("../assets/image/programDetails/chungRaCajon.jpg"),
    chorus: require("../assets/image/programDetails/chungRaChorus.jpg"),
    coding: require("../assets/image/programImages/chungRaCoding.png"),
    drum: require("../assets/image/poster/chungRaDrumPos.png"),
    eng: require("../assets/image/programDetails/chungRaEng.png"),
    elec: require("../assets/image/poster/chungRaElecPos.jpg"),
    guitar: require("../assets/image/programDetails/chungRaGuitar3.jpg"),
    piano: require("../assets/image/programDetails/chungRaPiano.jpg"),
    pilates: require("../assets/image/programImages/chungRaPilates.jpg"),
    ukulele: require("../assets/image/programDetails/chungRaUkulele.jpg"),
    vocal: require("../assets/image/poster/chungRaVocalPos.jpg"),
    violin: require("../assets/image/programDetails/chungRaViolin.jpg"),
    chelo: require("../assets/image/programDetails/chungRaCheloThumb.jpg"),
    electric: require("../assets/image/programDetails/chungRaElec3.jpg"),
    physical: require("../assets/image/programDetails/chungRaPhysical.jpg"),
    ccm: require("../assets/image/programDetails/chungRaworship.jpg"),
  };

  return { thumbnails, details };  // ✅ 이건 함수 안에서 실행되어야 함
};

// 카테고리 상수 정의
export const CATEGORIES = {
  MUSIC: "음악",
  EDUCATION: "교육",
  HEALTH: "건강",
  TECHNICAL: "기술",
};

// 인기 프로그램 ID 상수
export const FEATURED_IDS = [6, 7, 13, 10, 3, 15, 12, 8];

// 이미지 경로 가져오기
const { thumbnails: thumbnailImages, details: detailImages } =
  importProgramImages();

// 프로그램 데이터
export const programs = [
  {
    id: 6,
    category: CATEGORIES.MUSIC,
    title: "통기타",
    description: "기타의 다양한 소리를 만나보세요!",
    price: "전액무료",
    image: thumbnailImages.guitar,
    detailImage: detailImages.guitar,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 오전 10시 [모집 마감]",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 7,
    category: CATEGORIES.MUSIC,
    title: "드럼",
    description: "전액무료로 드럼을 배워보세요!",
    price: "전액무료",
    image: thumbnailImages.drum,
    detailImage: detailImages.drum,
    location: "청라콩 문화센터",
    schedule: "매주 목요일 오후 6/7/8시",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 8,
    category: CATEGORIES.MUSIC,
    title: "피아노",
    description: "클래식과 팝송을 함께 연주해요!",
    price: "전액무료",
    image: thumbnailImages.piano,
    detailImage: detailImages.piano,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 20시",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 10,
    category: CATEGORIES.MUSIC,
    title: "일렉기타",
    description: "일렉기타의 다양한 소리를 만나보세요!",
    price: "전액무료",
    image: thumbnailImages.elec,
    detailImage: detailImages.elec,
    location: "청라콩 문화센터",
    schedule: "매주 목요일 19시",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 13,
    category: CATEGORIES.MUSIC,
    title: "베이스",
    description: "베이스의 리듬과 멜로디를 연습해요!",
    price: "전액무료",
    image: thumbnailImages.bass,
    detailImage: detailImages.bass,
    location: "청라콩 문화센터",
    schedule: "매주 목요일 18시",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 11,
    category: CATEGORIES.MUSIC,
    title: "우쿨렐레",
    description: "우쿨렐레의 매력에 빠져보세요!",
    price: "전액무료",
    image: thumbnailImages.ukulele,
    detailImage: detailImages.ukulele,
    location: "청라콩 문화센터",
    schedule: "매주 화요일 오후 4시 30분",
    instructor: "음악 강사",
  },
  {
    id: 3,
    category: CATEGORIES.MUSIC,
    title: "카혼",
    description: "리듬의 마법을 체험해보세요!",
    price: "전액무료",
    image: thumbnailImages.cajon,
    detailImage: detailImages.cajon,
    location: "청라콩 문화센터",
    schedule: "시간협의",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 4,
    category: CATEGORIES.MUSIC,
    title: "바이올린",
    description: "클래식과 현대 음악을 연주해요!",
    price: "전액무료",
    image: thumbnailImages.violin,
    detailImage: detailImages.violin,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 12시30분 [모집 마감]",
    instructor: "음악 강사",
  },
  {
    id: 5,
    category: CATEGORIES.MUSIC,
    title: "첼로",
    description: "클래식 음악의 아름다움을 느껴요!",
    price: "전액무료",
    image: thumbnailImages.chelo,
    detailImage: detailImages.chelo,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 13시30분 [모집 마감]",
    instructor: "음악 강사",
  },
  {
    id: 12,
    category: CATEGORIES.MUSIC,
    title: "밴드",
    description: "밴드와 함께하는 특별한 연주 시간",
    price: "전액무료",
    image: thumbnailImages.band,
    detailImage: detailImages.band,
    location: "청라콩 문화센터",
    schedule: "매주 수요일 오후 6시",
    instructor: "음악 강사",
    isFeatured: true,
  },
  {
    id: 2,
    category: CATEGORIES.MUSIC,
    title: "보컬",
    description: "전문가와 함께하는 보컬 레슨",
    price: "전액무료",
    image: thumbnailImages.vocal,
    detailImage: detailImages.vocal,
    location: "청라콩 문화센터",
    schedule: "매주 월요일 18~20시, 화요일 18~20시, 토요일 11시 [모집 마감]",
    instructor: "음악 강사",
  },
  {
    id: 9,
    category: CATEGORIES.EDUCATION,
    title: "영어 회화",
    description: "실전에서 바로 쓰는 영어회화!",
    price: "전액무료",
    image: thumbnailImages.eng,
    detailImage: detailImages.eng,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 15~17시",
    instructor: "교육 강사",
  },
  {
    id: 14,
    category: CATEGORIES.EDUCATION,
    title: "코딩",
    description: "코딩의 기초부터 심화까지 배울 수 있는 프로그램",
    price: "전액무료",
    image: thumbnailImages.coding,
    detailImage: detailImages.coding,
    location: "청라콩 문화센터",
    schedule: "매주 토요일 16시",
    instructor: "교육 강사",
  },
  {
    id: 1,
    category: CATEGORIES.HEALTH,
    title: "필라테스",
    description: "체계적인 관리로 건강한 다이어트 실현!",
    price: "전액무료",
    image: thumbnailImages.pilates,
    detailImage: detailImages.pilates,
    location: "청라콩 문화센터",
    schedule: "매주 금요일 16시",
    instructor: "건강 강사",
  },
  {
    id: 16,
    category: CATEGORIES.TECHNICAL,
    title: "전기이론 마스터 클래스",
    description: "기초부터 심화까지 체계적인 전기이론 학습과정",
    price:"전액무료",
    image: thumbnailImages.electric,
    detailImage: detailImages.electric,
    location: "청라콩 문화센터",
    schedule: "주 1회 / 90분",
    instructor: "한찬호 강사",
    details: [
      "전기의 기본 원리와 법칙",
      "회로 설계 및 분석",
      "전기 안전과 실무 응용",
      "자격증 취득 준비",
    ],
    isFeatured: false,
  },
  {
    id: 17,
    category: CATEGORIES.HEALTH,
    title: "물리치료 실습",
    description: "실전 중심의 물리치료 실습 교육 프로그램",
    price: "전액무료",
    image: thumbnailImages.physical,
    detailImage: detailImages.physical,
    location: "청라콩",
    schedule: "120분",
    instructor: "김의한 강사",
    details: [
      "근골격계 치료 실습",
      "전기치료 및 운동치료",
      "재활운동 프로그램",
      "임상 케이스 스터디",
    ],
    isFeatured: false,
  },
{
  id: 18,
  category: CATEGORIES.MUSIC,
  title: "교회음악",
  description: "찬양과 예배를 위한 실전 중심의 CCM 교육",
  price: "전액무료",
  image: thumbnailImages.ccm,  // ✅ 수정
  detailImage: detailImages.ccm,  // ✅ 수정
  location: "청라콩",
  schedule: "60분",
  instructor: "교육 강사",
  details: [
    "찬양 인도 및 팀워크 실습",
    "보컬 및 악기별 파트 연습",
    "예배 흐름과 영성 훈련",
  ],
  isFeatured: false,
},


];

/**
 * 카테고리별 프로그램 목록을 반환합니다.
 * @param {string} category - 찾고자 하는 카테고리
 * @returns {Array} - 해당 카테고리의 프로그램 목록
 */
export const getProgramsByCategory = (category) => {
  if (!category) return programs;
  return programs.filter((program) => program.category === category);
};

/**
 * 인기 프로그램 목록을 반환합니다.
 * @returns {Array} - 인기 프로그램 목록
 */
export const getFeaturedPrograms = () => {
  return programs.filter((program) => FEATURED_IDS.includes(program.id));
};

/**
 * 음악 카테고리 프로그램 목록을 반환합니다.
 * @returns {Array} - 음악 관련 프로그램 목록
 */
export const getMusicPrograms = () => {
  return getProgramsByCategory(CATEGORIES.MUSIC);
};

/**
 * 주어진 검색어로 프로그램을 검색합니다.
 * @param {string} query - 검색어
 * @returns {Array} - 검색 결과 프로그램 목록
 */
export const searchPrograms = (query) => {
  if (!query || typeof query !== "string") return programs;

  const lowercaseQuery = query.toLowerCase().trim();

  if (!lowercaseQuery) return programs;

  return programs.filter(
    (program) =>
      (program.title && program.title.toLowerCase().includes(lowercaseQuery)) ||
      (program.description &&
        program.description.toLowerCase().includes(lowercaseQuery)) ||
      (program.instructor &&
        program.instructor.toLowerCase().includes(lowercaseQuery)) ||
      (program.category &&
        program.category.toLowerCase().includes(lowercaseQuery)) ||
      (program.location &&
        program.location.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * 무작위로 선택된 인기 프로그램을 반환합니다.
 * @param {number} count - 반환할 프로그램 수
 * @returns {Array} - 무작위 인기 프로그램 목록
 */
export const getRandomFeaturedPrograms = (count = 4) => {
  const featured = getFeaturedPrograms();

  // 요청한 개수가 전체 인기 프로그램보다 많은 경우 처리
  const actualCount = Math.min(count, featured.length);

  // 피셔-예이츠 셔플 알고리즘을 사용한 무작위 선택
  const shuffled = [...featured];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, actualCount);
};

/**
 * 프로그램 ID로 특정 프로그램을 찾습니다.
 * @param {number} id - 프로그램 ID
 * @returns {Object|null} - 찾은 프로그램 또는 null
 */
export const getProgramById = (id) => {
  if (!id) return null;
  const numId = typeof id === "string" ? parseInt(id, 10) : id;
  return programs.find((program) => program.id === numId) || null;
};

/**
 * 요일별 프로그램 목록을 반환합니다.
 * @param {string} dayOfWeek - 요일 (예: '월요일', '화요일' 등)
 * @returns {Array} - 해당 요일의 프로그램 목록
 */
export const getProgramsByDay = (dayOfWeek) => {
  if (!dayOfWeek) return [];

  return programs.filter(
    (program) => program.schedule && program.schedule.includes(dayOfWeek)
  );
};

/**
 * 강사별 프로그램 목록을 반환합니다.
 * @param {string} instructor - 강사 이름
 * @returns {Array} - 해당 강사의 프로그램 목록
 */
export const getProgramsByInstructor = (instructor) => {
  if (!instructor) return [];

  return programs.filter(
    (program) => program.instructor && program.instructor.includes(instructor)
  );
};
