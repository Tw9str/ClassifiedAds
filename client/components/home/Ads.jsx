import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import { useState } from "react";
import { useSelector } from "react-redux";
import Product from "../product/Product";

export default function Ads({ adList }) {
  const [ads, setAds] = useState(adList);
  const token = useSelector((state) => state.token);

  // async function handleAdSold(id) {
  //   try {
  //     await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ad/update/${id}`,
  //       {
  //         method: "PATCH",
  //       }
  //     );
  //     setAds(ads.map((ad) => (ad._id === id ? { ...ad, sold: !ad.sold } : ad)));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  async function handleAdDelete(id) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Section>
      <SectionHead title="أحدث الأعلانات" linkText="إظهار الكل" />
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2 pb-20">
        {ads?.map((ad, index) => {
          const { category, title, location, price, imgsSrc, _id } = ad;
          return (
            <Product
              key={index}
              category={category}
              title={title}
              location={location}
              price={price}
              imgsSrc={imgsSrc}
              id={_id}
              onAdRemove={handleAdDelete}
            />
          );
        })}
      </div>
    </Section>
  );
}
