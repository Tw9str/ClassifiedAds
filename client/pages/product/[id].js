import Link from "next/link";
import { useRouter } from "next/router";
import ads from "@/products";
import { AiOutlineClockCircle, AiOutlineTag } from "react-icons/ai";
import Options from "@/components/product/Options";
import SimilarAds from "@/components/product/SimilarAds";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const product = ads.find((ad) => ad.id === parseInt(id));

  return product ? (
    <div className="bg-bgGray min-h-screen py-12">
      <div className="container flex gap-6 mx-auto p-6 items-start flex-col md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="p-6 flex gap-6 bg-white flex-col border border-lightGray rounded basis-1/2">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-2 text-gray">
                  <span className="flex items-center gap-2 pl-2">
                    <AiOutlineClockCircle /> {product.date}
                  </span>
                </div>
              </div>
              <h3 className="text-gray font-bold text-2xl">{product.title}</h3>
              <Options />
            </div>
          </div>
          <div className="bg-white border border-lightGray p-6 rounded">
            <h3 className="pb-6 font-medium">الوصف:</h3>
            <p className="text-gray">{product.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 basis-full w-full">
          <div className="overflow-hidden relative flex border border-lightGray p-6 rounded bg-white items-center gap-6">
            <span className="border-l border-lightGray pl-6 text-5xl">
              <AiOutlineTag className="text-[#cfd9e0]" />
            </span>
            <div className="flex flex-col">
              <span className="text-primaryColor text-3xl font-bold">
                ${product.price}
              </span>
              <span className="text-gray text-sm">قابل للتفاوض</span>
            </div>
            <span className="absolute pl-6 text-7xl text-[#cfd9e0] opacity-30 -left-8 -bottom-4">
              <AiOutlineTag />
            </span>
          </div>
          <div className="flex flex-col border border-lightGray p-6 rounded bg-white items-center">
            <div className="rounded-full overflow-hidden w-28">
              <img
                src={product.publisher.img}
                alt={product.publisher.title}
                className="w-full"
              />
            </div>
            <h4 className="font-semibold text-2xl pt-4">
              {product.publisher.title}
            </h4>
            <p className="text-gray">{product.publisher.desc}</p>
            <Link href="/ads" className="pt-2 underline text-[#4B7CE2]">
              رؤية جميع الأعلانات
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
  ) : (
    <p>Loading...</p>
  );
}
