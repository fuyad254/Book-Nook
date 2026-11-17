import Banner from "@/component/homePage/banner";
import LatestBookSection from "@/component/homePage/latestBookSection";
import ReaderReviewPage from "@/component/homePage/readerReview";
import WhyChooseUsPage from "@/component/homePage/whyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner/>
      <LatestBookSection/>
      <ReaderReviewPage/>
      <WhyChooseUsPage/>
    </div>
  );
}
