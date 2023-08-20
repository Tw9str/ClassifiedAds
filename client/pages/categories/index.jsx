import CategoyBox from "@/components/widgets/CategoyBox";
import Section from "@/components/widgets/Section";
import Image from "next/image";
import Link from "next/link";

export default function AllCategories({ categoryList }) {
  return (
    <Section>
      <CategoyBox categoryList={categoryList} />
    </Section>
  );
}

export async function getServerSideProps() {
  try {
    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
    );
    const categoryList = await categoryResponse.json();
    return {
      props: {
        categoryList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryList: null,
        error: "Failed to fetch data",
      },
    };
  }
}
