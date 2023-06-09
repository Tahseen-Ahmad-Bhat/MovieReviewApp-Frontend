import React, { useState } from "react";
import { useNotification } from "../../hooks";
import ModalContainer from "./ModalContainer";
import ActorForm from "../form/ActorForm";
import { updateActor } from "../../api/actor";

export default function UpdateActor({
  visible,
  onClose,
  actorToUpdate,
  onActorUpdate,
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(actorToUpdate.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor updated successfully!");
    onClose();
    onActorUpdate(actor);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        actorToUpdate={actorToUpdate}
      />
    </ModalContainer>
  );
}
