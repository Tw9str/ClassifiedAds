import { useState } from "react";
import { useSelector } from "react-redux";
import Product from "@/components/product/Product";
import Section from "@/components/widgets/Section";

export default function UserAds({ userAdList }) {
  const [userAds, setUserAds] = useState(userAdList);
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
      setUserAds((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2 pb-20">
        {userAds?.length > 0 &&
          userAds?.map(
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

export async function getServerSideProps(context) {
  const username = context.query.username;
  try {
    const adsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${username}/ads`
    );
    const userAdList = await adsResponse.json();
    return {
      props: {
        userAdList,
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
