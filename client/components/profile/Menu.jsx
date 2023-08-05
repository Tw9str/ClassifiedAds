import { useState } from "react";
import { setLogout } from "@/state/authSlice";
import Image from "next/image";
import Link from "next/link";
import { FiUserX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div>
          <Image
            className="rounded-full"
            src="/images/01.png"
            width={64}
            height={64}
          />
        </div>
      </button>

      <div
        className={`bg-black p-6 rounded-md absolute top-[100%] transition z-3 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mb-3">
          <div>
            <Image
              className="rounded-full"
              src="/images/01.png"
              width={96}
              height={96}
            />
          </div>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
        <ul>
          <li>
            <Link href="">الملف الشخصي</Link>
          </li>
          <li>
            <Link href="">إدارة الحساب</Link>
          </li>
          <li>
            <Link href="">إعلاناتي</Link>
          </li>
          <li>
            <button
              className="text-white text-xl"
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
