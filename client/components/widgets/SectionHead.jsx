import Link from "next/link";

export default function SectionHead({ linkTarget, linkText, title }) {
  return (
    <div className="flex justify-between items-center border-b pb-4 border-neutral-100">
      <h3 className="text-secondary-900 font-bold text-3xl">{title}</h3>
      <Link href={`/${linkTarget}`} className="font-medium underline">
        {linkText}
      </Link>
    </div>
  );
}
