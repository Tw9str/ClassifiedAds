import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import Options from "@/components/product/Options";
import SimilarAds from "@/components/product/SimilarAds";
import Image from "next/image";
import Slider from "@/components/widgets/Slider";
import Section from "@/components/widgets/Section";

export default function ProductDetails({
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
  return (
    <Section>
      <div className="flex gap-6 mx-auto items-start flex-col md:flex-row">
        <div className="flex flex-col w-3/5 gap-6">
          <div className="relative p-6 flex gap-6 bg-white flex-col border border-lightGray rounded basis-1/2">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-2 text-gray">
                  <span className="flex items-center gap-2 pl-2">
                    <AiOutlineClockCircle /> {createdAt}
                  </span>
                </div>
              </div>
              <h3 className="text-gray font-bold text-2xl">{title}</h3>
              <Options />
              <Slider>
                {imgsSrc.map((img) => (
                  <div
                    key={img}
                    className="relative snap-start w-full flex-[0_0_100%] aspect-video"
                  >
                    <Image
                      style={{ objectFit: "contain" }}
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
          <div className="bg-white border border-lightGray p-6 rounded">
            <h3 className="pb-6 font-medium">الوصف:</h3>
            <p className="text-gray">{description}</p>
          </div>
        </div>
        <div className="flex flex-col w-2/5 gap-6">
          <div className="overflow-hidden flex border border-lightGray p-6 rounded bg-white items-center gap-6">
            <span className="border-l border-lightGray pl-6 text-5xl">
              <AiOutlineTag className="text-[#cfd9e0]" />
            </span>
            <div className="flex flex-col">
              <span className="text-primaryColor text-3xl font-bold">
                {price}
              </span>
            </div>
            <span className="pl-6 text-7xl text-[#cfd9e0] opacity-30 -left-8 -bottom-4">
              <AiOutlineTag />
            </span>
          </div>
          <div className="flex flex-col border border-lightGray p-6 rounded bg-white items-center">
            <div className="w-24 h-24 overflow-hidden rounded-full relative">
              <Image
                style={{ objectFit: "cover" }}
                src={`/images/${imgsSrc[0]}`}
                alt={title}
                fill
              />
            </div>
            <Link
              href={`/ads/${user.username}/${user._id}`}
              className="font-semibold text-2xl pt-4"
            >
              {title}
            </Link>
          </div>
        </div>
      </div>
      <SimilarAds />
    </Section>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  try {
    const adResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ad/${slug}`
    );
    const ad = await adResponse.json();
    return {
      props: {
        ad,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        ad: null,
        error: "Failed to fetch data",
      },
    };
  }
}
