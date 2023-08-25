import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import CategoyBox from "../widgets/CategoyBox";

export default function Categories({ categoryList }) {
  return (
    <Section>
      <SectionHead
        title="الأقسام"
        linkTarget="categories"
        linkText="إظهار الكل"
      />
      <div className="flex flex-wrap gap-10 justify-center items-center pt-6">
        {categoryList
          ?.slice(0, 12)
          ?.map(({ title, imgSrc, adCount }, index) => (
            <CategoyBox
              key={index}
              title={title}
              imgSrc={imgSrc}
              adCount={adCount}
            />
          ))}
      </div>
    </Section>
  );
}
