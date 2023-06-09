import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[35rem] max-h-[30rem] overflow-auto p-2 custom-scrollbar">
        {profiles.length ? (
          profiles.map(({ id, avatar, name }) => {
            return (
              <div
                key={id}
                className="flex space-x-3 border-b-2 p-2 dark:bg-secondary bg-white drop-shadow-md rounded"
              >
                <img
                  className="w-16 h-16 aspect-square rounded object-cover"
                  src={avatar}
                  alt={name}
                />
                <p className="w-full font-semibold dark:text-white text-primary">
                  {name}
                </p>

                <button
                  onClick={() => onRemoveClick(id)}
                  className="dark:text-white text-primary hover:opacity-80 transition p-2"
                >
                  <AiOutlineClose />
                </button>
              </div>
            );
          })
        ) : (
          <p>No writer selected yet!</p>
        )}
      </div>
    </ModalContainer>
  );
}
