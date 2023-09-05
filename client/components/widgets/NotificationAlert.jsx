import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

export default function NotificationAlert({ text, linkText }) {
  return (
    <div className="flex fixed inset-0">
      <div className="m-auto">
        <div className="bg-white rounded-lg border-neutral-300 border p-3 shadow-lg">
          <div className="flex gap-4">
            <div className="px-2">
              <AiOutlineCheckCircle
                size={24}
                className="text-accent-green-500"
              />
            </div>
            <div>
              <span className="font-semibold text-secondary-900">{text}</span>
              <Link href="/cart" className="block text-secondary-500">
                {linkText}
              </Link>
            </div>
            <button className="inline-flex text-secondary-500 px-2 hover:text-secondary-600">
              <AiOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
