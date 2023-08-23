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
    currency: "EUR",
    minimumFractionDigits: 0,
  };

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <Section>
      <div className="">
        <div className="">
          <h2>المفضلة</h2>
          {items.length > 0 && (
            <div className="">
              {items.map(({ id, title, price, img, slug }) => (
                <div className="" key={id}>
                  <Link href={`/shop/${slug}`} className="">
                    {/* <Image
                    src={`${API_URL}/assets/imgs/${img}`}
                    alt={title}
                    fill
                  /> */}
                  </Link>
                  <div className="">
                    <h3 className="">{title}</h3>
                    <p className="">
                      {price.toLocaleString("nl-NL", options) + ",-"}
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
