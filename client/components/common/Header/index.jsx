import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@/components/profile/Menu";
import { FiHeart, FiUser } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();

  const token = useSelector((state) => state.token);

  const isHomePage = router.pathname === "/";

  const className = isHomePage
    ? "absolute bg-transparent w-full top-0 left-1/2 transform -translate-x-1/2"
    : "relative bg-heroBg";

  return (
    <div className={className}>
      <div className="container mx-auto p-6 flex justify-between items-center">
        <Link href="/" className="font-bold text-white">
          الشعار هنا
        </Link>
        <Link href="/wishlist" className="text-white text-xl">
          <FiHeart />
        </Link>
        <Link href="/cart" className="text-white text-xl">
          <AiOutlineShoppingCart />
        </Link>
        {!token ? (
          <Link href="/login" className="text-white text-xl">
            <FiUser />
          </Link>
        ) : (
          <Menu />
        )}
        <Link
          href="/list"
          className="text-white text-xl rounded border hidden p-2 items-center gap-2 sm:flex"
        >
          <AiOutlinePlus /> أضف أعلانك
        </Link>
        <Link href="/listing" className="text-white text-xl p-2 sm:hidden">
          <AiOutlinePlus />
        </Link>
      </div>
    </div>
  );
}
