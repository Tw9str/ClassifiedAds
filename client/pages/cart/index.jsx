import { useSelector, useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeCartItem,
  closeCart,
} from "@/state/cartSlice";
// import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Section from "@/components/widgets/Section";

export default function Cart() {
  const dispatch = useDispatch();

  const { items, totalPrice, totalQuantity } = useSelector((state) => ({
    items: state.cart.items,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
  }));

  function handleItemIncrease(id) {
    dispatch(increaseItemQuantity({ id }));
  }
  function handleItemDecrease(id) {
    dispatch(decreaseItemQuantity({ id }));
  }
  function handleItemRemove(id) {
    dispatch(removeCartItem({ id }));
  }
  // const handleCartCheckout = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-checkout-session`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ items }),
  //       }
  //     );
  //     const { sessionId } = await response.json();
  //     const stripe = await loadStripe(
  //       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  //     );
  //     stripe.redirectToCheckout({ sessionId });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const options = {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  };

  return (
    <Section>
      <div className="">
        <h2>السلة</h2>
        {items.length > 0 && (
          <div className="flex flex-wrap items-center justify-start py-6 gap-2">
            {items.map(({ id, title, price, quantity, img, slug }) => (
              <div
                key={id}
                className="w-full xs:w-[calc(100%/2-4px)] md:w-[calc(100%/3-6px)] lg:w-[calc(100%/4-6px)] rounded-lg border border-neutral-100 shadow-lg"
              >
                <Link
                  href={`item/${slug}`}
                  className="relative block aspect-video"
                >
                  <Image
                    style={{
                      objectFit: "cover",
                    }}
                    src={`/images/${img}`}
                    alt={title}
                    fill
                  />
                </Link>
                <div className="">
                  <h3 className="">{title}</h3>
                  <p className="">
                    {price.toLocaleString("ar-SA-u-nu-latn", options)}
                  </p>
                </div>
                <div className="">
                  <button
                    aria-label="Less"
                    onClick={() => handleItemDecrease(id)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label="More"
                    onClick={() => handleItemIncrease(id)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <button
                  aria-label="Remove"
                  onClick={() => handleItemRemove(id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
        {items.length > 0 && (
          <div className="">
            <p className="">
              العناصر ({totalQuantity})
              <span>
                {totalPrice?.toLocaleString("ar-SA-u-nu-latn", options)}
              </span>
            </p>
            <p className="">
              المبلغ الإجمالي:
              <span>
                {totalPrice?.toLocaleString("ar-SA-u-nu-latn", options)}
              </span>
            </p>
            <button className="">شراء</button>
          </div>
        )}
        {items.length === 0 && <p>لم تقف بإضافة عناصر الى السلة</p>}
      </div>
    </Section>
  );
}
