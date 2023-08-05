import {
  AiOutlineDownload,
  AiOutlinePrinter,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsFlag } from "react-icons/bs";

export default function Options() {
  return (
    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
      <button className="flex items-center gap-2 border-2 border-lightGray hover:text-primaryColor hover:border-primaryColor transition rounded text-gray p-2 text-sm">
        <BsFlag /> رفع بلاغ
      </button>
      <button className="flex items-center gap-2 border-2 border-lightGray hover:text-primaryColor hover:border-primaryColor transition rounded text-gray p-2 text-sm">
        <AiOutlineDownload /> تحميل
      </button>
      <button className="flex items-center gap-2 border-2 border-lightGray hover:text-primaryColor hover:border-primaryColor transition rounded text-gray p-2 text-sm">
        <AiOutlinePrinter /> طباعة
      </button>
      <button className="flex items-center gap-2 border-2 border-lightGray hover:text-primaryColor hover:border-primaryColor transition rounded text-gray p-2 text-sm">
        <AiOutlineHeart /> أضافة الى المرجع
      </button>
      <button className="flex items-center gap-2 border-2 border-lightGray hover:text-primaryColor hover:border-primaryColor transition rounded text-gray p-2 text-sm">
        <AiOutlineShareAlt /> مشاركة
      </button>
    </div>
  );
}
