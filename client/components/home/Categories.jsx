import Link from "next/link";
import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import Image from "next/image";
import CategoyBox from "../widgets/CategoyBox";
import { useState } from "react";

export default function Categories({ categoryList }) {
  return (
    <Section>
      <SectionHead
        title="الأقسام"
        linkTarget="categories"
        linkText="إظهار الكل"
      />
      <div className="pt-6 flex flex-wrap gap-10 justify-start items-center">
        {categoryList.slice(0, 12)?.map(({ title, imgSrc, adCount }, index) => (
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
