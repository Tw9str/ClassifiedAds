import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import Image from "next/image";
import Page from "@/components/widgets/Page";
import Options from "@/components/product/Options";
import Slider from "@/components/widgets/Slider";
import SimilarAds from "@/components/product/SimilarAds";

export default function ProductDetails({
  relatedAds,
  ad: {
    category,
    createdAt,
    description,
    imgsSrc,
    price,
    slug,
    title,
    updatedAt,
    user,
    _id,
  },
}) {
  const options = {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat("ar-SA-u-nu-latn", options);

  return (
    <Page>
      <div className="flex flex-col gap-6 mx-auto items-start flex-col md:flex-row">
        <div className="flex flex-col w-full gap-6 md:w-3/4">
          <div className="relative p-6 flex gap-6 bg-white flex-col border border-neutral-300 rounded basis-1/2">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-2 text-secondary-500">
                  <span className="flex items-center gap-2 pl-2">
                    <AiOutlineClockCircle />
                    {new Date(createdAt).toLocaleString("ar-Ar", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <h3 className="text-secondary-900 font-bold text-2xl">{title}</h3>
              <Options />
              <Slider>
                {imgsSrc.map((img) => (
                  <div
                    key={img}
                    className="relative snap-start w-full flex-[0_0_100%] aspect-video"
                  >
                    <Image
                      style={{
                        objectFit: "contain",
                      }}
                      key={img}
                      src={`/images/${img}`}
                      alt={title}
                      fill
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="bg-white border border-neutral-300 p-6 rounded">
            <p className="text-secondary-600 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>
        <div className="flex w-full gap-6 md:w-1/4 flex-col">
          <div className="overflow-hidden flex border border-neutral-300 p-6 rounded bg-white items-center gap-6">
            <span className="border-l border-neutral-300 text-secondary-300 pl-6 text-5xl">
              <AiOutlineTag />
            </span>
            <div className="flex flex-col">
              <span className="text-primary-500 text-3xl font-bold">
                {formatter.format(price)}
              </span>
            </div>
            <span className="pl-6 text-7xl text-secondary-300 opacity-30">
              <AiOutlineTag />
            </span>
          </div>
          <Link
            href={`/ads/${user.username}`}
            className="flex flex-col border border-neutral-300 p-6 rounded bg-white items-center group"
          >
            <div className="w-24 h-24 overflow-hidden rounded-full relative group-hover:scale-110 duration-300">
              <Image
                style={{ objectFit: "cover" }}
                src={`/images/${imgsSrc[0]}`}
                alt={title}
                fill
              />
            </div>
            <span className="text-secondary-900 font-semibold text-2xl pt-4 group-hover:text-primary-500 duration-300">
              {user.username}
            </span>
          </Link>
        </div>
      </div>
      <SimilarAds relatedAds={relatedAds} currentId={_id} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  try {
    const adResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ad/${slug}`
    );
    const ad = await adResponse.json();

    const relatedAdsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ads/${ad.category}`
    );
    const relatedAds = await relatedAdsResponse.json();
    return {
      props: {
        ad,
        relatedAds,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        ad: null,
        relatedAds: null,
        error: "Failed to fetch data",
      },
    };
  }
}
