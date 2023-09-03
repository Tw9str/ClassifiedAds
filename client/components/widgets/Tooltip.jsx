import React from "react";

export default function Tooltip({ children, text }) {
  return (
    <div className="relative group">
      <button>{children}</button>
      <div className="absolute bg-white rounded shadow-lg invisible opacity-0 w-max p-2 bottom-8 left-0 group-hover:visible group-hover:opacity-100 duration-300">
        {text && text}
      </div>
    </div>
  );
}
