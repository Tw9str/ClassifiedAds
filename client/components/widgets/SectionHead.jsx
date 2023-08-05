import Link from "next/link";

export default function SectionHead({ linkText, title }) {
  return (
    <div className="flex justify-between items-center border-b pb-4 border-lightGray">
      <h3 className="text-black font-bold text-3xl">{title}</h3>
      <Link href="/categories" className="font-medium underline">
        {linkText}
      </Link>
    </div>
  );
}
