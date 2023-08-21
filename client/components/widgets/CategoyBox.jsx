import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoyBox({ title, imgSrc, adCount }) {
  return (
    <Link
      href={`/categories/${title.replace(" ", "-")}`}
      className="text-center hover:text-primaryColor transition"
    >
      <Image
        src={`/images/${imgSrc}`}
        alt={title}
        width={150}
        height={130}
        className="rounded-xl hover:scale-105 transition"
      />
      <h3 className="py-2 font-bold text-lg">{title}</h3>
      <p className="text-gray text-sm">{adCount}</p>
    </Link>
  );
}
