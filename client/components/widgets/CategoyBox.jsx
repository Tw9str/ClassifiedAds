import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoyBox({ categoryList }) {
  return (
    <div className="pt-6 flex flex-wrap gap-10 justify-start items-center">
      {categoryList?.map(({ imgSrc, title }, index) => (
        <Link
          key={index}
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
          <p className="text-gray text-sm">{categoryList.length}</p>
        </Link>
      ))}
    </div>
  );
}
