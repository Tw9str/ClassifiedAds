import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import Slider from "../widgets/Slider";
import Product from "./Product";

export default function SimilarAds() {
  return (
    <Section>
      <SectionHead title="إعلانات مشابهة" linkText="إظهار الكل" />
      <div className="relative">
        <Slider>
          {/* {ads.map((ad, index) => {
            return <Product />;
          })} */}
        </Slider>
      </div>
    </Section>
  );
}
