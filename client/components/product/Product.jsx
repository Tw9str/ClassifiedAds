import React from "react";
import Link from "next/link";
import { ImLocation } from "react-icons/im";
import { FcApproval } from "react-icons/fc";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

export default function Product({
  category,
  title,
  location,
  price,
  imgsSrc,
  id,
  onAdRemove,
}) {
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
            href={`/product/${id}`}
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
            السعر: <span className="font-bold">${price}</span>
          </p>
          <div className="flex gap-4">
            <button className="text-gray">
              <FaShoppingCart />
            </button>
            <button className="text-gray">
              <FaHeart />
            </button>
            <button className="text-gray" onClick={() => onAdRemove(id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
