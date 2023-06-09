import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useNotification, useTheme } from "../../hooks";
import AppSearchForm from "../form/AppSearchForm";
import { searchMovies } from "../../api/movie";
import { useNavigate } from "react-router-dom";

export default function Header({ onAddMovieClick, onAddActorClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleDarkMood } = useTheme();

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = async (query) => {
    if (!query.trim())
      return updateNotification(
        "error",
        "Please provide a valid Search Query!"
      );

    navigate("/search?title=" + query);
  };

  return (
    <div className="flex items-center justify-between relative p-5">
      <AppSearchForm
        onSubmit={handleSearchSubmit}
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-5">
        <button
          onClick={toggleDarkMood}
          className=" dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>

        <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle border-secondary dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerId = "option-container";

  useEffect(() => {
    const handleCLose = (e) => {
      if (!visible) return;

      const { parentElement, id } = e.target;

      if (parentElement.id === containerId || id === containerId) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleCLose);

    return () => {
      document.removeEventListener("click", handleCLose);
    };
  }, [visible]);

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) onClose();
    e.target.classList.remove("animate-scale");
  };

  const handleClick = (fun) => {
    fun();
    onClose();
  };

  if (!visible) return null;
  return (
    <div
      id={containerId}
      ref={container}
      className=" absolute right-0 top-12 z-50 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({ title, onClick }, index) => {
        return (
          <Option key={index} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
