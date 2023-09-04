import Page from "@/components/widgets/Page";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeCartItem,
} from "@/state/cartSlice";
// import { loadStripe } from "@stripe/stripe-js";
import { BiPlus, BiMinus } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

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
    <Page>
      <h2 className="text-center text-3xl font-bold">السلة</h2>
      <div className="flex flex-col md:flex-row-reverse gap-4 py-6">
        {items.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-2 w-full">
            {items.map(({ id, title, price, quantity, img, slug }) => (
              <div
                key={id}
                className="w-full xs:w-[calc(100%/2-4px)] lg:w-[calc(100%/3-6px)] rounded-lg border border-neutral-100 shadow-lg duration-300"
              >
                <Link
                  href={`item/${slug}`}
                  className="relative block aspect-video overflow-hidden group"
                >
                  <Image
                    className="object-cover group-hover:scale-110 duration-300"
                    src={`/images/${img}`}
                    alt={title}
                    fill
                  />
                </Link>
                <div className="p-2">
                  <h2 className="font-bold text-secondary-900 hover:text-primary-500 duration-300">
                    {title}
                  </h2>
                  <span className="font-bold text-lg text-primary-500">
                    {price.toLocaleString("ar-SA-u-nu-latn", options)}
                  </span>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                      <button
                        className="group"
                        aria-label="Less"
                        onClick={() => handleItemDecrease(id)}
                      >
                        <BiMinus
                          size={24}
                          className="group-hover:scale-110 group-hover:text-primary-500 duration-300"
                        />
                      </button>
                      <span className="font-bold text-lg">{quantity}</span>
                      <button
                        className="group"
                        aria-label="More"
                        onClick={() => handleItemIncrease(id)}
                      >
                        <BiPlus
                          size={24}
                          className="group-hover:scale-110 group-hover:text-primary-500 duration-300"
                        />
                      </button>
                    </div>
                    <button
                      className="group"
                      aria-label="Remove"
                      onClick={() => {
                        handleItemRemove(id);
                      }}
                    >
                      <FiTrash
                        size={24}
                        className="text-neutral-400 group-hover:scale-110 group-hover:text-primary-500 duration-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {items.length > 0 && (
          <div className="flex flex-col justify-center gap-4 w-full md:w-96 h-56 bg-secondary-100 p-4 rounded-lg">
            <p className="flex items-center justify-between font-bold">ملخص:</p>
            <p className="flex items-center justify-between font-bold border-b pb-4">
              العناصر ({totalQuantity})
              <span className="font-bold">
                {totalPrice?.toLocaleString("ar-SA-u-nu-latn", options)}
              </span>
            </p>
            <p className="flex items-center justify-between font-bold">
              المبلغ الإجمالي:
              <span className="font-bold">
                {totalPrice?.toLocaleString("ar-SA-u-nu-latn", options)}
              </span>
            </p>
            <button className="flex w-32 justify-center rounded-md bg-primary-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 duration-300">
              الدفع
            </button>
          </div>
        )}
      </div>
      {items.length === 0 && <p>لم تقف بإضافة عناصر الى السلة</p>}
    </Page>
  );
}
