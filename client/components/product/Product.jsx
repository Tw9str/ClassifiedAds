import React from "react";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/state/cartSlice";
import { addWishItem, removeWishItem } from "@/state/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCart, BsCartFill, BsTrash, BsTrashFill } from "react-icons/bs";
import Image from "next/image";
import Rating from "../widgets/Rating";
import { FiTruck } from "react-icons/fi";

export default function Product({
  category,
  title,
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
    <div className="w-full xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] overflow-hidden rounded-lg border border-borderColor shadow-lg">
      <div className="relative aspect-video">
        <Image
          style={{
            objectFit: "cover",
          }}
          src={`/images/${imgsSrc[0]}`}
          alt={title}
          fill
        />
      </div>
      <div>
        <div className="p-4">
          <div className="flex justify-center items-center gap-2">
            <Link
              href={`/categories/${category.title}`}
              className="flex items-center gap-2 text-gray text-sm"
            >
              {category.title} <FcApproval />
            </Link>
            <span className="text-sm">تم شراءه 5356</span>
            <span className="text-sm">1236 تعليق</span>
          </div>
          <Link
            href={`/item/${slug}`}
            className="font-bold hover:text-primaryColor transition"
          >
            {title}
          </Link>
          <Rating />
          <ul className="flex justify-center items-center gap-2">
            <li>
              <FiTruck />
            </li>
            <li>قولد</li>
            <li>5 نجوم</li>
            <li>ثقة</li>
            <li>الأكثر مبيعاً</li>
          </ul>
        </div>
        <div className="p-4 border-t border-borderColor flex justify-between">
          <span className="font-bold"> {formatter.format(price)}</span>
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
