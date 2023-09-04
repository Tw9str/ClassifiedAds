import { AiFillStar } from "react-icons/ai";

export default function Rating() {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="cursor-pointer text-star">
          <AiFillStar />
        </span>
      ))}
    </div>
  );
}
