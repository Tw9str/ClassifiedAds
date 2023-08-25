import React from "react";

export default function Tooltip({ children, text }) {
  return (
    <div className="relative group">
      <button>{children}</button>
      <div className="absolute bg-white rounded shadow-lg hidden w-max p-2 bottom-8 left-0 group-hover:block">
        {text && text}
      </div>
    </div>
  );
}
