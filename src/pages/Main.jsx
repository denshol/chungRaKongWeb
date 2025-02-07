import React, { useRef } from "react";
import HeroSlider from "../components/HeroSlider";
import ProgramRanking from "../components/ProgramRanking";
import FeaturedClasses from "../components/FeaturedClasses";
import FeaturedClasses2 from "../components/FeaturedClasses2";
import IconNavigation from "../components/IconNavigation";
import PromotionBanner from "../components/PromotionBanner";
import MemberGallery from "../components/MemberGallery"; // 추가

const Main = () => {
  const rankingRef = useRef(null);
  const musicRef = useRef(null);

  return (
    <main>
      <IconNavigation />
      <FeaturedClasses ref={musicRef} />
      <FeaturedClasses2 />
      <ProgramRanking ref={rankingRef} />
      <MemberGallery /> {/* 추가 */}
      <PromotionBanner />
    </main>
  );
};

export default Main;
