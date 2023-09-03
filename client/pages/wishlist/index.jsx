import { useSelector } from "react-redux";
import { removeWishItem, closeWish } from "@/state/wishlistSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import Section from "@/components/widgets/Section";

export default function Wishlist() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.wishlist.items);

  function handleItemRemove(id) {
    dispatch(removeWishItem({ id }));
  }

  const options = {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <Section>
      <div className="">
        <div className="">
          <h2>المفضلة</h2>
          {items.length > 0 && (
            <div className="flex flex-wrap items-center justify-start py-6 gap-2">
              {items.map(({ id, title, price, img, slug }) => (
                <div
                  key={id}
                  className="w-full xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded-lg border border-neutral-100 shadow-lg"
                >
                  <Link
                    href={`item/${slug}`}
                    className="relative block aspect-video"
                  >
                    <Image
                      style={{
                        objectFit: "cover",
                      }}
                      src={`/images/${img}`}
                      alt={title}
                      fill
                    />
                  </Link>
                  <div className="">
                    <h3 className="">{title}</h3>
                    <p className="">
                      {price.toLocaleString("ar-SA-u-nu-latn", options)}
                    </p>
                  </div>
                  <button aria-label="" onClick={() => handleItemRemove(id)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          )}
          {items.length === 0 && <p>فارغة</p>}
        </div>
      </div>
    </Section>
  );
}
