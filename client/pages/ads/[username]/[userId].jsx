import Product from "@/components/product/Product";
import Section from "@/components/widgets/Section";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserAds({ userAdsList }) {
  const [userAds, setUserAds] = useState(userAdsList);
  const token = useSelector((state) => state.token);

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
      setUserAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2 pb-20">
        {userAds?.length > 0 &&
          userAds?.map((ad, index) => {
            const { category, title, location, price, imgsSrc, _id, user } = ad;
            return (
              <Product
                key={index}
                category={category}
                title={title}
                location={location}
                price={price}
                imgsSrc={imgsSrc}
                id={_id}
                user={user}
                onAdRemove={handleAdDelete}
              />
            );
          })}
      </div>
    </Section>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.userId;
  try {
    const adsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}/ads`
    );
    const userAdsList = await adsResponse.json();
    return {
      props: {
        userAdsList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        userAds: null,
        error: "Failed to fetch data",
      },
    };
  }
}
