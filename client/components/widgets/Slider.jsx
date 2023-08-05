import { useState, useRef } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

export default function Slider({ children }) {
  const [isDown, setIsDown] = useState(false);
  const [x, setX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const productsContainer = useRef();

  const handleMouseDown = (e) => {
    setIsDown(true);
    setX(e.pageX - productsContainer.current.offsetLeft);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDown) return;
    setCurrentX(e.pageX - productsContainer.current.offsetLeft);
    const walk = (x - currentX) * 3;
    productsContainer.current.scrollLeft += walk;
  };

  const handlePrevClick = () => {
    productsContainer.current.scrollBy({
      left: -productsContainer.current.offsetWidth,
      behavior: "smooth",
      scrollTimingFunction: "ease-in-out",
    })
  };

  const handleNextClick = () => {
    productsContainer.current.scrollBy({
      left: productsContainer.current.offsetWidth,
      behavior: "smooth",
      scrollTimingFunction: "ease-in-out",
    })
  };

  return (
    <div className="relative">
      <button
        className="bg-primaryColor rounded-full text-white absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
        onClick={handleNextClick}>
        <AiOutlineArrowRight />
      </button>
      <div
        className={`flex overflow-x-scroll scrollbar-hide pt-6 gap-2 pb-20 snap-mandatory snap-x scroll-smooth${
          isDown && ` cursor-grabbing`
        }`}
        ref={productsContainer}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {children}
      </div>
      <button
        className="bg-primaryColor rounded-full text-white absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl p-2"
        onClick={handlePrevClick}>
        <AiOutlineArrowLeft />
      </button>
    </div>
  );
}
