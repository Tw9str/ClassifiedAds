import { useState } from "react";
import { useSelector } from "react-redux";
import Section from "../widgets/Section";
import SectionHead from "../widgets/SectionHead";
import AlertMessage from "../widgets/AlertMessage";
import Slider from "../widgets/Slider";
import Product from "./Product";

export default function SimilarAds({ relatedAds, currentId }) {
  const [relatedAdsList, setRelatedAdsList] = useState(
    relatedAds.filter((ad) => ad._id !== currentId)
  );
  const token = useSelector((state) => state.auth.token);

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
      setRelatedAdsList((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Section>
      {relatedAdsList.length === 0 ? (
        <AlertMessage text="لا يوجد إعلانات مشابهة!" />
      ) : (
        <>
          <SectionHead
            title="إعلانات مشابهة"
            linkText="إظهار الكل"
            linkTarget={`categories/${relatedAdsList[0]?.category.title}`}
          />
          <div className="relative">
            <Slider>
              {relatedAdsList.map(
                (
                  { _id, title, price, imgsSrc, slug, user, category },
                  index
                ) => {
                  return (
                    <Product
                      key={index}
                      id={_id}
                      title={title}
                      price={price}
                      imgsSrc={imgsSrc}
                      slug={slug}
                      user={user}
                      category={category}
                      onAdRemove={handleAdDelete}
                    />
                  );
                }
              )}
            </Slider>
          </div>
        </>
      )}
    </Section>
  );
}
