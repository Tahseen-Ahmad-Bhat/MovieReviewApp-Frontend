import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function CastModal({
  casts = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[35rem] max-h-[30rem] overflow-auto p-2 custom-scrollbar">
        {casts.length ? (
          casts.map(({ profile, roleAs, leadActor }) => {
            const { name, avatar, id } = profile;
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
                <div className="w-full flex flex-col justify-between py-1">
                  <div>
                    <p className="font-semibold dark:text-white text-primary">
                      {name}
                    </p>
                    <p className="text-sm dark:text-dark-subtle text-light-subtle">
                      {roleAs}
                    </p>
                  </div>
                  {leadActor && (
                    <AiOutlineCheck className=" text-light-subtle dark:text-dark-subtle" />
                  )}
                </div>

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
          <p>No Cast member selected yet!</p>
        )}
      </div>
    </ModalContainer>
  );
}
