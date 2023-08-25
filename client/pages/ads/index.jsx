import Ads from "@/components/home/Ads";
import Product from "@/components/product/Product";
import Section from "@/components/widgets/Section";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AllAds({ adList }) {
  const [ads, setAds] = useState(adList);
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
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2">
        {ads?.map(
          (
            { category, title, location, price, imgsSrc, _id, slug, user },
            index
          ) => {
            return (
              <Product
                key={index}
                category={category}
                title={title}
                location={location}
                price={price}
                imgsSrc={imgsSrc}
                id={_id}
                slug={slug}
                user={user}
                onAdRemove={handleAdDelete}
              />
            );
          }
        )}
      </div>
    </Section>
  );
}

export async function getServerSideProps() {
  try {
    const adsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ads`
    );

    const adList = await adsResponse.json();

    return {
      props: {
        adList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        adList: null,
        error: "Failed to fetch data",
      },
    };
  }
}
