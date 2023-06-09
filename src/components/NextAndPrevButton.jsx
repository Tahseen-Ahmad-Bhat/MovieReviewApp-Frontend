import React from "react";

export default function NextAndPrevButton({
  showPrevBtn,
  showNextBtn,
  onNextClick,
  onPrevClick,
  className = "",
}) {
  const getClasses = () => {
    return "flex justify-end items-center space-x-10 px-2 ";
  };
  return (
    <div className={getClasses() + className}>
      {showPrevBtn && <Button onClick={onPrevClick} title="Prev" />}
      {showNextBtn && <Button onClick={onNextClick} title="Next" />}
    </div>
  );
}

const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline font-semibold"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
