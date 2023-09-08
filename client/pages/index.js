import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Ads from "@/components/home/Ads";

export default function Home({ categoryList, adList }) {
  return (
    <>
      <Hero />
      <Categories categoryList={categoryList} />
      <Ads adList={adList} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
    );
    const adsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ads`
    );

    const categoryList = await categoriesResponse.json();
    const adList = await adsResponse.json();

    return {
      props: {
        categoryList,
        adList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryList: null,
        adList: null,
        error: "Failed to fetch data",
      },
    };
  }
}
