import Link from "next/link";
import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import ads from "@/products";
import { ImLocation } from "react-icons/im";
import { FcApproval } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import Slider from "../widgets/Slider";

export default function SimilarAds() {
  return (
    <Section className="overflow-hidden">
      <SectionHead title="إعلانات مشابهة" linkText="إظهار الكل" />
      <Slider>
        {ads.map((ad, index) => {
          const { category, title, location, price, img, id } = ad;
          return (
            <div
              key={index}
              className="rounded border border-boxBorderLightGray w-64 flex-shrink-0 mx-2">
              <img src={img} alt={title} className="w-full xs:w-auto" />
              <div>
                <div className="p-4 pt-2">
                  <Link
                    href="/category"
                    className="flex items-center gap-2 text-gray text-sm pb-2">
                    {category} <FcApproval />
                  </Link>
                  <Link
                    href={`/product/${id}`}
                    className="font-bold hover:text-primaryColor transition">
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
      </Slider>
    </Section>
  );
}
