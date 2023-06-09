import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { getSingleActor } from "../../api/actor";
import { useNotification } from "../../hooks";

export default function ProfileModal({ visible, profileId, onClose }) {
  const [profile, setProfile] = useState({});

  const { updateNotification } = useNotification();

  const fetchActor = async () => {
    const { error, actor } = await getSingleActor(profileId);

    if (error) return updateNotification("error", error);

    console.log(actor);
    setProfile({ ...actor });
  };

  useEffect(() => {
    if (profileId) fetchActor();
    console.log("fired");
  }, [profileId]);

  const { avatar, name, about } = profile;

  return (
    <ModalContainer visible={visible} ignoreContainer onClose={onClose}>
      <div className="p-5 rounded flex flex-col items-center bg-white dark:bg-primary space-y-3">
        <img className="w-28 h-28 rounded-full" src={avatar} alt={name} />
        <h1 className="dark:text-white text-primary font-semibold">{name}</h1>
        <p className="dark:text-dark-subtle text-light-subtle ">{about}</p>
      </div>
    </ModalContainer>
  );
}
