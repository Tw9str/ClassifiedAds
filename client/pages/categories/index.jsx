import CategoyBox from "@/components/widgets/CategoyBox";
import Page from "@/components/widgets/Page";

export default function AllCategories({ categoryList }) {
  return (
    <Page>
      <h1 className="text-center text-3xl font-bold">الفئات</h1>
      <div className="flex flex-wrap gap-10 justify-center items-center pt-6">
        {categoryList?.map(({ title, imgSrc, adCount }, index) => (
          <CategoyBox
            key={index}
            title={title}
            imgSrc={imgSrc}
            adCount={adCount}
          />
        ))}
      </div>
    </Page>
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
