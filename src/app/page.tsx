import Banner from "@/component/homePage/banner";
import ReaderReviewPage from "@/component/homePage/readerReview";
import WhyChooseUsPage from "@/component/homePage/whyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner/>
      <ReaderReviewPage/>
      <WhyChooseUsPage/>
    </div>
  );
}
