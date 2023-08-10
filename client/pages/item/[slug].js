import Link from "next/link";
import { AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import Options from "@/components/product/Options";
import SimilarAds from "@/components/product/SimilarAds";
import Image from "next/image";

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
    <div className="bg-bgGray min-h-screen py-12">
      <div className="container flex gap-6 mx-auto p-6 items-start flex-col md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="p-6 flex gap-6 bg-white flex-col border border-lightGray rounded basis-1/2">
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
            </div>
          </div>
          <div className="bg-white border border-lightGray p-6 rounded">
            <h3 className="pb-6 font-medium">الوصف:</h3>
            <p className="text-gray">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 basis-full w-full">
          <div className="overflow-hidden relative flex border border-lightGray p-6 rounded bg-white items-center gap-6">
            <span className="border-l border-lightGray pl-6 text-5xl">
              <AiOutlineTag className="text-[#cfd9e0]" />
            </span>
            <div className="flex flex-col">
              <span className="text-primaryColor text-3xl font-bold">
                {price}
              </span>
              <span className="text-gray text-sm">قابل للتفاوض</span>
            </div>
            <span className="absolute pl-6 text-7xl text-[#cfd9e0] opacity-30 -left-8 -bottom-4">
              <AiOutlineTag />
            </span>
          </div>
          <div className="flex flex-col border border-lightGray p-6 rounded bg-white items-center">
            <div className="rounded-full overflow-hidden w-24 h-24 relative">
              <Image src={`/images/${imgsSrc[0]}`} alt={title} fill />
            </div>
            <h4 className="font-semibold text-2xl pt-4">{title}</h4>
            <p className="text-gray">{description}</p>
            <Link href="/ads" className="pt-2 underline text-[#4B7CE2]">
              إظهار جميع الأعلانات
            </Link>
            <div className="flex gap-6 pt-6">
              <button className="border-2 border-[#cfd9e0] p-2 font-semibold text-gray rounded hover:text-primaryColor hover:border-primaryColor transition">
                أرسال رسالة
              </button>
              <button className="border-2 border-[#cfd9e0] p-2 font-semibold text-gray rounded hover:text-primaryColor hover:border-primaryColor">
                أرسال عرض
              </button>
            </div>
          </div>
        </div>
      </div>
      <SimilarAds />
    </div>
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
