import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex items-center justify-between bg-heroBg">
      <Link
        href="/"
        className="text-white font-bold text-xl container mx-auto p-6">
        الشعار هنا
      </Link>
    </div>
  );
}
