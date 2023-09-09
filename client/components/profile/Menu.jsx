import { useState } from "react";
import { setLogout } from "@/state/authSlice";
import Image from "next/image";
import Link from "next/link";
import { FiUserX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-secondary-50 relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div>
          <Image
            className="rounded-full"
            src="/images/01.png"
            alt="pfp"
            width={48}
            height={48}
          />
        </div>
      </button>

      <div
        className={`bg-neutral-800 p-6 w-40 rounded-md absolute top-[100%] duration-300 z-10 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mb-3">
          <div>
            <Image
              className="rounded-full"
              src="/images/01.png"
              alt="pfp"
              width={64}
              height={64}
            />
          </div>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
        <ul>
          <li>
            <Link href="/profile">الملف الشخصي</Link>
          </li>
          <li>
            <Link href="/profile/manage">إدارة الحساب</Link>
          </li>
          <li>
            <Link href={`/ads/${user.username}`}>إعلاناتي</Link>
          </li>
          <li>
            <button
              className="text-secondary-50 text-xl"
              onClick={() => dispatch(setLogout())}
            >
              <FiUserX />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
