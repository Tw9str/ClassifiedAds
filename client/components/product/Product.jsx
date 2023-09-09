import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/state/cartSlice";
import { addWishItem, removeWishItem } from "@/state/wishlistSlice";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineCheck,
} from "react-icons/ai";
import {
  MdOutlineSell,
  MdOutlineModeComment,
  MdOutlineVerified,
  MdOutlineVerifiedUser,
  MdLocalShipping,
  MdHexagon,
} from "react-icons/md";
import { RiMedal2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";
import Tooltip from "../widgets/Tooltip";
import NotificationAlert from "../widgets/NotificationAlert";
import { useState } from "react";
import { useEffect } from "react";

export default function Product({
  category,
  title,
  price,
  imgsSrc,
  id,
  slug,
  user,
  onAdRemove,
}) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationText, setNotificationText] = useState({
    text: "تم الحذف بنجاح!",
    linkText: "",
  });
  const currentUserId = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch();
  const { isInCart, isInWishlist } = useSelector((state) => ({
    isInCart: state.cart.items.some((item) => item.id === id),
    isInWishlist: state.wishlist.items.some((item) => item.id === id),
  }));

  const item = {
    id,
    title,
    price: Number.parseInt(price),
    imgsSrc: imgsSrc[0],
    slug,
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setIsNotificationVisible(false);
    }, 1000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [isNotificationVisible]);

  function handleItemAdd() {
    dispatch(
      addCartItem({
        newItem: item,
      })
    );
    setIsNotificationVisible(true);
    setNotificationText({
      text: "تم الإضافة الى السلة!",
      linkText: "الإستمرار الى الدفع.",
    });
  }

  function handleNotificationClose() {
    setIsNotificationVisible(false);
  }

  function handleFavClick() {
    setIsNotificationVisible(true);
    if (isInWishlist) {
      dispatch(
        removeWishItem({
          id,
        })
      );
      setNotificationText({
        text: "تمت الإزالة من المفضلة!",
        linkText: "",
      });
    } else {
      dispatch(
        addWishItem({
          newItem: item,
        })
      );
      setNotificationText({
        text: "تم الإضافة الى المفضلة!",
        linkText: "",
      });
    }
  }

  function handleRemoveProduct() {
    onAdRemove(id);
    setIsNotificationVisible(true);
  }

  const options = {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat("ar-SA-u-nu-latn", options);

  return (
    <div className="w-full sm:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded-lg border border-neutral-100 shadow-lg">
      <div className="flex flex-row-reverse justify-between items-center p-2">
        <Link
          href={`/ads/${user.username}`}
          className="flex flex-row-reverse justify-center items-center gap-2 group"
        >
          <div className="w-12 h-12 overflow-hidden rounded-full relative group-hover:scale-110 duration-300">
            <Image
              style={{ objectFit: "cover" }}
              src={`/images/${imgsSrc[0]}`}
              alt={title}
              fill
            />
          </div>
          <span className="text-secondary-900 font-bold group-hover:text-primary-500 duration-300">
            {user.username}
          </span>
        </Link>
        <Tooltip text="موثق بسجل من وزارة التجارة">
          <MdOutlineVerified className="text-accent-blue-600" size={32} />
        </Tooltip>
      </div>
      <Link href={`/item/${slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            className="hover:scale-105 duration-300"
            style={{
              objectFit: "cover",
            }}
            src={`/images/${imgsSrc[0]}`}
            alt={title}
            fill
          />
        </div>
      </Link>
      <div className="flex flex-col justify-center items-between gap-2 p-2">
        <div className="flex justify-between items-center">
          <Link
            href={`/categories/${category.title}`}
            className="flex items-center gap-2 text-secondary-600 text-sm"
          >
            {category.title} <FcApproval />
          </Link>
          <div className="flex justify-center items-center gap-2">
            <span className="flex items-center gap-px text-sm">
              5356
              <Tooltip text="مرات الشراء">
                <MdOutlineSell
                  className="text-neutral-400 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                  size={24}
                />
              </Tooltip>
            </span>
            <span className="flex items-center gap-px text-sm">
              1236
              <Tooltip text="التعليقات">
                <MdOutlineModeComment
                  className="text-neutral-400 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                  size={24}
                />
              </Tooltip>
            </span>
            <button
              className="flex items-center gap-px text-sm"
              onClick={handleFavClick}
            >
              1200
              <Tooltip text="الإعجابات">
                {isInWishlist ? (
                  <AiFillHeart
                    size={24}
                    className="text-primary-600 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                  />
                ) : (
                  <AiOutlineHeart
                    size={24}
                    className="text-neutral-400 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                  />
                )}
              </Tooltip>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={`/item/${slug}`}
            className="font-bold text-secondary-900 hover:text-primary-500 duration-300"
          >
            {title}
          </Link>
          <Rating />
        </div>
        <ul className="flex justify-center items-center gap-2">
          <li>
            <Tooltip text="الشحن متوفر.">
              <MdLocalShipping className="text-neutral-400" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="الوسام الذهبي!">
              <MdHexagon className="text-star" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="تقييم 5 نجمات.">
              <FaStar className="text-star" size={24} />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="موثوق من قبل العملاء">
              <MdOutlineVerifiedUser
                className="text-accent-blue-600"
                size={24}
              />
            </Tooltip>
          </li>
          <li>
            <Tooltip text="الأكثر مبيعاً">
              <RiMedal2Fill className="text-accent-blue-600" size={24} />
            </Tooltip>
          </li>
        </ul>
      </div>
      <div className="flex items-center p-2 border-t border-neutral-100 flex justify-between">
        <span className="font-bold text-lg text-primary-500">
          {formatter.format(price)}
        </span>
        <div className="flex gap-4">
          {currentUserId === user._id && (
            <button className="group" onClick={handleRemoveProduct}>
              <FiTrash
                size={24}
                className="text-neutral-400 group-hover:scale-110 group-hover:text-primary-500 duration-300"
              />
            </button>
          )}
          <button
            className="flex gap-2 items-center bg-accent-blue-600 hover:bg-accent-blue-500 disabled:bg-neutral-300 px-4 py-2 rounded-lg shadow-lg group duration-300"
            onClick={handleItemAdd}
            disabled={isInCart}
          >
            {isInCart ? (
              <AiOutlineCheck size={24} className="text-neutral-50" />
            ) : (
              <AiOutlineShoppingCart
                size={24}
                className="text-neutral-50 group-hover:scale-110 duration-300"
              />
            )}
          </button>
        </div>
      </div>
      {isNotificationVisible && (
        <NotificationAlert
          text={notificationText.text}
          linkText={notificationText.linkText}
          onNotificationClose={handleNotificationClose}
          isAdding={notificationText.text.includes("إضافة")}
        />
      )}
    </div>
  );
}
