import CategoyBox from "@/components/widgets/CategoyBox";
import Section from "@/components/widgets/Section";

export default function AllCategories({ categoryList }) {
  return (
    <Section>
      <div className="pt-6 flex flex-wrap gap-10 justify-center items-center">
        {categoryList?.map(({ title, imgSrc, adCount }, index) => (
          <CategoyBox
            key={index}
            title={title}
            imgSrc={imgSrc}
            adCount={adCount}
          />
        ))}
      </div>
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
