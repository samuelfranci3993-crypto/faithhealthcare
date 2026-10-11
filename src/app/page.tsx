import HeroSection from "@/components/HeroSection";
import HomeSections from "@/components/HomeSections";
import {
  getAllMedicines,
  getParentCategoryCounts,
  getFeaturedMedicines,
} from "@/lib/medicines";
import { getAllInsights } from "@/lib/insights";
import { getReviewStats } from "@/lib/reviews-store";

export default function HomePage() {
  const featured = getFeaturedMedicines(9);
  const categories = getParentCategoryCounts();
  const allMedicines = getAllMedicines();
  const total = allMedicines.length;
  const { average, count } = getReviewStats();
  const insightCount = getAllInsights().length;

  return (
    <>
      <HeroSection
        totalMedicines={total}
        reviewAverage={average}
        reviewCount={count}
        medicines={allMedicines}
      />
      <HomeSections
        categories={categories}
        featured={featured}
        total={total}
        insightCount={insightCount}
      />
    </>
  );
}

