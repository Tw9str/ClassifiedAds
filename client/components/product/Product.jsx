import React from "react";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/state/cartSlice";
import { addWishItem, removeWishItem } from "@/state/wishlistSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCart, BsCartFill, BsTrash, BsTrashFill } from "react-icons/bs";
import {
  MdOutlineSell,
  MdOutlineModeComment,
  MdOutlineVerified,
  MdOutlineVerifiedUser,
  MdLocalShipping,
  MdHexagon,
} from "react-icons/md";
import { RiMedal2Fill } from "react-icons/ri";
import Image from "next/image";
import Rating from "../widgets/Rating";
import Tooltip from "../widgets/Tooltip";
import { FaStar } from "react-icons/fa";

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
  const currentUserId = useSelector((state) => state.auth.user?._id);
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
    <div className="w-full xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded-lg border border-borderColor shadow-lg">
      <div className="flex flex-row-reverse justify-between items-center p-2">
        <Link
          href={`/ads/${user.username}`}
          className="flex flex-row-reverse justify-center items-center gap-2"
        >
          <div className="w-12 h-12 overflow-hidden rounded-full relative">
            <Image
              style={{ objectFit: "cover" }}
              src={`/images/${imgsSrc[0]}`}
              alt={title}
              fill
            />
          </div>
          <span className="font-semibold text-lg">{user.username}</span>
        </Link>
        <Tooltip text="موثق بسجل من وزارة التجارة">
          <MdOutlineVerified className="text-blue" size={32} />
        </Tooltip>
      </div>
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
      <div className="flex flex-col justify-center items-between gap-2 p-2">
        <div className="flex justify-between items-center">
          <Link
            href={`/categories/${category.title}`}
            className="flex items-center gap-2 text-gray text-sm"
          >
            {category.title} <FcApproval />
          </Link>
          <div className="flex justify-center items-center gap-2">
            <span className="flex items-center gap-1 text-sm">
              5356
              <Tooltip text="مرات الشراء">
                <MdOutlineSell size={24} />
              </Tooltip>
            </span>
            <span className="flex items-center gap-1 text-sm">
              1236
              <Tooltip text="التعليقات">
                <MdOutlineModeComment size={24} />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={`/item/${slug}`}
            className="font-bold hover:text-primaryColor transition"
          >
            {title}
          </Link>
          <Rating />
        </div>
        <ul className="flex justify-center items-center gap-2">
          <li>
            <Tooltip text="الشحن متوفر.">
              <MdLocalShipping className="text-gray" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="الوسام الذهبي!">
              <MdHexagon className="text-star" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="تقييم 5 نجمات.">
              <FaStar className="text-star" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="موثوق من قبل العملاء">
              <MdOutlineVerifiedUser className="text-blue" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="الأكثر مبيعاً">
              <RiMedal2Fill className="text-blue" size={24} />
            </Tooltip>
          </li>
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
          {currentUserId === user._id && (
            <button className="text-gray" onClick={() => onAdRemove(id)}>
              <BsTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
