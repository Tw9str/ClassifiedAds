import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@/components/profile/Menu";
import { FiUser } from "react-icons/fi";
import {
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);
  const { cartCount, wishlistCount } = useSelector((state) => ({
    cartCount: state.cart.items.length,
    wishlistCount: state.wishlist.items.length,
  }));

  const isHomePage = router.pathname === "/";

  const className = isHomePage
    ? "absolute bg-transparent w-full top-0 left-1/2 transform -translate-x-1/2"
    : "relative bg-heroBg";

  return (
    <div className={className}>
      <div className="container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/list"
            className="text-white text-xl rounded border hidden p-2 items-center gap-2 sm:flex"
          >
            <AiOutlinePlus /> أضف أعلانك
          </Link>
          <Link
            href="/list"
            className="text-white text-xl rounded border p-2 sm:hidden"
          >
            <AiOutlinePlus />
          </Link>
          <div className="flex items-center gap-4">
            {!token ? (
              <Link href="/login" className="text-white text-xl">
                <FiUser />
              </Link>
            ) : (
              <Menu />
            )}
            <Link href="/cart" className="relative text-secondary-50 text-xl">
              {cartCount > 0 && (
                <span className="absolute w-6 h-6 text-white bg-primary-500 text-sm rounded-full bottom-5 left-3 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <AiOutlineShoppingCart size={24} />
            </Link>
            <Link
              href="/wishlist"
              className="relative text-secondary-50 text-xl"
            >
              {wishlistCount > 0 && (
                <span className="absolute w-6 h-6 text-white bg-primary-500 text-sm rounded-full bottom-5 left-3 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <AiOutlineHeart size={24} />
            </Link>
          </div>
        </div>
        <Link href="/" className="font-bold text-white">
          الشعار هنا
        </Link>
      </div>
    </div>
  );
}
