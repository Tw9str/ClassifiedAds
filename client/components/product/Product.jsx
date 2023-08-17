import React from "react";
import Link from "next/link";
import { ImLocation } from "react-icons/im";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/state/cartSlice";
import { addWishItem, removeWishItem } from "@/state/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCart, BsCartFill, BsTrash, BsTrashFill } from "react-icons/bs";

export default function Product({
  category,
  title,
  location,
  price,
  imgsSrc,
  id,
  slug,
  user,
  onAdRemove,
}) {
  const userId = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const item = {
    id,
    title,
    price: Number.parseInt(price),
    imgsSrc: imgsSrc[0],
  };

  function handleItemAdd() {
    dispatch(
      addCartItem({
        newItem: item,
      })
    );
  }

  function handleFavClick() {
    if (items.some((item) => item.id === id)) {
      dispatch(
        removeWishItem({
          id,
        })
      );
    } else {
      dispatch(
        addWishItem({
          newItem: item,
        })
      );
    }
  }

  const options = {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat("ar-SA-u-nu-latn", options);

  return (
    <div className="xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded border border-boxBorderLightGray">
      <img
        src={`/images/${imgsSrc[0]}`}
        alt={title}
        className="w-full xs:w-auto"
      />
      <div>
        <div className="p-4 pt-2">
          <Link
            href="/category"
            className="flex items-center gap-2 text-gray text-sm pb-2"
          >
            {category} <FcApproval />
          </Link>
          <Link
            href={`/item/${slug}`}
            className="font-bold hover:text-primaryColor transition"
          >
            {title}
          </Link>
          <p className="flex items-center gap-2 text-gray py-2">
            {location} <ImLocation />
          </p>
        </div>
        <div className="p-4 border-t border-boxBorderLightGray flex justify-between">
          <p>
            السعر:
            <span className="font-bold"> {formatter.format(price)}</span>
          </p>
          <div className="flex gap-4">
            <button className="text-gray" onClick={handleItemAdd}>
              <BsCart />
            </button>
            <button className="text-gray" onClick={handleFavClick}>
              <AiOutlineHeart />
            </button>
            {userId === user && (
              <button className="text-gray" onClick={() => onAdRemove(id)}>
                <BsTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
