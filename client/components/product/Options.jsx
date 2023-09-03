import {
  AiOutlineDownload,
  AiOutlinePrinter,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsFlag } from "react-icons/bs";

export default function Options() {
  return (
    <div className="flex items-start gap-2 md:flex-row md:items-center">
      <button className="flex items-center gap-2 border-2 border-neutral-300 hover:text-primary-500 hover:border-primary-500 duration-300 rounded text-secondary-500 p-2 text-sm">
        <AiOutlineHeart /> حفظ
      </button>
      <button className="flex items-center gap-2 border-2 border-neutral-300 hover:text-primary-500 hover:border-primary-500 duration-300 rounded text-secondary-500 p-2 text-sm">
        <AiOutlineShareAlt /> مشاركة
      </button>
    </div>
  );
}
