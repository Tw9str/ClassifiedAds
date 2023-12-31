import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Page from "@/components/widgets/Page";
import Product from "@/components/product/Product";
import { useRouter } from "next/router";
import AlertMessage from "@/components/widgets/AlertMessage";

export default function UserAds({ userAdList }) {
  const [userAds, setUserAds] = useState(userAdList);
  const router = useRouter();
  const { username } = router.query;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setUserAds(userAdList);
  }, [userAdList]);

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
    <Page>
      {userAds?.length > 0 ? (
        <>
          <h1 className="text-center text-3xl font-bold">إعلانات {username}</h1>
          <div className="flex flex-wrap items-center justify-start pt-6 gap-2 pb-20">
            {userAds.map(
              ({
                category,
                title,
                location,
                price,
                imgsSrc,
                _id,
                slug,
                user,
              }) => (
                <Product
                  key={_id} // Use a unique key like _id
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
              )
            )}
          </div>
        </>
      ) : (
        <AlertMessage text={`لم يقم ${username} برفع أي إعلانات!`} />
      )}
    </Page>
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
