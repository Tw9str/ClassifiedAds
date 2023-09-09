import Page from "@/components/widgets/Page";
import { useSelector } from "react-redux";
import { removeWishItem, closeWish } from "@/state/wishlistSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import AlertMessage from "@/components/widgets/AlertMessage";

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

  return (
    <Page>
      <h2 className="text-center text-3xl font-bold">المفضلة</h2>
      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-start py-6 gap-2">
          {items.map(({ id, title, price, img, slug }) => (
            <div
              key={id}
              className="w-full xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded-lg border border-neutral-100 shadow-lg"
            >
              <Link
                href={`item/${slug}`}
                className="relative block aspect-video overflow-hidden group"
              >
                <Image
                  className="object-cover group-hover:scale-110 duration-300"
                  src={`/images/${img}`}
                  alt={title}
                  fill
                />
              </Link>
              <div className="p-2">
                <h2 className="font-bold text-secondary-900 hover:text-primary-500 duration-300">
                  {title}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-primary-500">
                    {price.toLocaleString("ar-SA-u-nu-latn", options)}
                  </span>
                  <button
                    className="group"
                    aria-label="remove"
                    onClick={() => handleItemRemove(id)}
                  >
                    <AiFillHeart
                      size={24}
                      className="text-primary-600 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length === 0 && (
        <div className="mt-12">
          <AlertMessage text="لم تقم بالإعجاب بأي إعلان!" />
        </div>
      )}
    </Page>
  );
}
