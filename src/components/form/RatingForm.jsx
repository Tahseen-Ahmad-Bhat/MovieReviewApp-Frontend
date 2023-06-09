import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNotification } from "../../hooks";
import Submit from "./Submit";

const createArray = (length) => {
  return new Array(length).fill("");
};

const ratings = createArray(10);

export default function RatingForm({ busy, initialState, onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const { updateNotification } = useNotification();

  const handleMouseEnter = (index) => {
    const arr = createArray(index + 1);
    setSelectedRatings([...arr]);
  };

  const handleOnChange = ({ target }) => {
    const { value } = target;

    setContent(value);
  };

  const handleOnSubmit = () => {
    if (!selectedRatings.length)
      return updateNotification(
        "error",
        "Please provide the ratings by selecting the stars"
      );
    const data = {
      rating: selectedRatings.length,
      content,
    };

    onSubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
        ></textarea>

        <Submit busy={busy} onClick={handleOnSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => (
    <AiOutlineStar
      onMouseEnter={() => onMouseEnter(index)}
      className="cursor-pointer"
      key={index}
      size={24}
    />
  ));
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => (
    <AiFillStar
      onMouseEnter={() => onMouseEnter(index)}
      className="cursor-pointer"
      key={index}
      size={24}
    />
  ));
};
