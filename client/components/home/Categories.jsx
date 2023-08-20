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
      <CategoyBox categoryList={categoryList.slice(0, 12)} />
    </Section>
  );
}
