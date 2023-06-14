import React from "react";

export default function PleaseWait({ message = "Please wait" }) {
  return (
    <div className="h-screen flex justify-center items-center dark:bg-primary  bg-white">
      <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-2xl ">
        {message}
      </p>
    </div>
  );
}
