import React from "react";

export default function Title({ children }) {
  return (
    <h1 className=" md:text-xl text-base dark:text-white text-secondary font-semibold text-center ">
      {children}
    </h1>
  );
}
