import Product from "@/components/product/Product";
import Section from "@/components/widgets/Section";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CategoryList({ categoryAdList }) {
  const [categoryAdArray, setCategoryAdArray] = useState(categoryAdList);
  const token = useSelector((state) => state.auth.token);

  const router = useRouter();
  const { title } = router.query;

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
      setCategoryAdArray((prevAds) => prevAds.filter((ad) => ad._id !== id));
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Section>
      <h1>{title?.replace("-", " ")}</h1>
      <div className="flex flex-wrap items-center justify-start pt-6 gap-2">
        {categoryAdArray.length > 0 &&
          categoryAdArray?.map((ad, index) => {
            const {
              category,
              title,
              location,
              price,
              imgsSrc,
              _id,
              slug,
              userId,
            } = ad;
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
                userId={userId}
                onAdRemove={handleAdDelete}
              />
            );
          })}
      </div>
    </Section>
  );
}

export async function getServerSideProps(context) {
  const title = context.query.title;
  try {
    const categoryAdResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${title}`
    );
    const categoryAdList = await categoryAdResponse.json();
    return {
      props: {
        categoryAdList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryAdList: null,
        error: "Failed to fetch data",
      },
    };
  }
}
