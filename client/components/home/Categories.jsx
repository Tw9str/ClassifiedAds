import Link from "next/link";
import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import Image from "next/image";

export default function Categories({ categoryList }) {
  return (
    <Section>
      <SectionHead title="الأقسام" linkText="إظهار الكل" />
      <div className="pt-6 flex flex-wrap gap-10 justify-center items-center">
        {categoryList?.map(({ imgSrc, title }, index) => (
          <Link
            key={index}
            href={`/categories/${title.replace(" ", "-")}`}
            className="text-center hover:text-primaryColor transition"
          >
            <Image
              src={`/images/${imgSrc}`}
              alt={title}
              width={150}
              height={130}
              className="rounded-xl hover:scale-105 transition"
            />
            <h3 className="py-2 font-bold text-lg">{title}</h3>
            <p className="text-gray text-sm">{categoryList.length}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
