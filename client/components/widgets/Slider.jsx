import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

export default function Slider({ children, currentImg, totalImgs }) {
  const [currentCount, setCurrentCount] = useState(0);

  const sliderRef = useRef();

  function handleNextClick() {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
      scrollTimingFunction: "ease-in-out",
    });
    if (currentCount < totalImgs) {
      setCurrentCount((prev) => prev + 1);
    }
  }

  function handlePrevClick() {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
      scrollTimingFunction: "ease-in-out",
    });
    if (currentCount > 1) {
      setCurrentCount((prev) => prev - 1);
    }
  }

  useEffect(() => {
    if (currentImg !== null) {
      const scrollPosition =
        sliderRef.current.offsetWidth * currentImg -
        sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentCount(currentImg);
    }
  }, [currentImg]);

  return (
    <div
      className="flex items-center justify-start gap-4 overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
      ref={sliderRef}
    >
      {children}
      <button
        className="absolute z-2 p-4 border-none bg-transparent cursor-pointer right-4"
        onClick={handleNextClick}
      >
        <AiOutlineArrowRight />
      </button>
      <button
        className="absolute z-2 p-4 border-none bg-transparent cursor-pointer left-4"
        onClick={handlePrevClick}
      >
        <AiOutlineArrowLeft />
      </button>
      {totalImgs && (
        <div className="flex items-center justify-center gap-2 font-semibold absolute bottom-1/4 right-1/4 z-1 text-primary-600">
          <BsImages /> {currentCount} / {totalImgs}
        </div>
      )}
    </div>
  );
}
