import React from "react";

export default function AlertMessage({ text }) {
  return (
    <p
      className="bg-secondary-100 border-l-4 border-primary-500 text-primary-600 text-xl text-center font-bold p-4"
      role="alert"
    >
      {text}
    </p>
  );
}
