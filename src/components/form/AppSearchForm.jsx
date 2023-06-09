import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

export default function AppSearchForm({
  showResetIcon,
  placeholder,
  inputClassName = defaultInputStyle,
  onSubmit,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleOnReset = () => {
    setValue("");
    onReset();
  };
  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name=""
        id=""
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />

      {showResetIcon ? (
        <button
          type="button"
          className="absolute top-1/3 right-2 text-secondary dark:text-white"
          onClick={handleOnReset}
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
