import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoyBox({ title, imgSrc, adCount }) {
  return (
    <Link
      href={`/categories/${title.replace(" ", "-")}`}
      className="text-center group"
    >
      <Image
        src={`/images/${imgSrc}`}
        alt={title}
        width={150}
        height={130}
        className="rounded-xl group-hover:scale-105 duration-300"
      />
      <h3 className="py-2 font-bold text-lg text-secondary-900 group-hover:text-primary-600 duration-300">
        {title}
      </h3>
      <p className="text-secondary-500 text-sm">{adCount}</p>
    </Link>
  );
}
