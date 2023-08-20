import Link from "next/link";

export default function SectionHead({ linkTarget, linkText, title }) {
  return (
    <div className="flex justify-between items-center border-b pb-4 border-lightGray">
      <h3 className="text-black font-bold text-3xl">{title}</h3>
      <Link href={`/${linkTarget}`} className="font-medium underline">
        {linkText}
      </Link>
    </div>
  );
}
