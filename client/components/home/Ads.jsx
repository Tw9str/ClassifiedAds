import Link from "next/link";
import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import { ImLocation } from "react-icons/im";
import { FcApproval } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import ads from "@/products";

export default function Ads({ adList }) {
  return (
    <Section>
      <SectionHead title="أحدث الأعلانات" linkText="إظهار الكل" />
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2 pb-20">
        {adList?.map((ad, index) => {
          const { category, title, location, price, imgsSrc, id } = ad;
          return (
            <div
              key={index}
              className="xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded border border-boxBorderLightGray"
            >
              <img
                src={`/images/${imgsSrc[0]}`}
                alt={title}
                className="w-full xs:w-auto"
              />
              <div>
                <div className="p-4 pt-2">
                  <Link
                    href="/category"
                    className="flex items-center gap-2 text-gray text-sm pb-2"
                  >
                    {category} <FcApproval />
                  </Link>
                  <Link
                    href={`/product/${id}`}
                    className="font-bold hover:text-primaryColor transition"
                  >
                    {title}
                  </Link>
                  <p className="flex items-center gap-2 text-gray py-2">
                    {location} <ImLocation />
                  </p>
                </div>
                <div className="p-4 border-t border-boxBorderLightGray flex justify-between">
                  <p>
                    السعر: <span className="font-bold">${price}</span>
                  </p>
                  <button className="text-gray">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
