import React from "react";
import ModalContainer from "./ModalContainer";
import RatingForm from "../form/RatingForm";
import { addReview } from "../../api/review";
import { useParams } from "react-router-dom";
import { useNotification } from "../../hooks";

export default function AddRatingModal({ visible, onSuccess, onClose }) {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(movieId, data);
    console.log(error, reviews);
    if (error) return updateNotification("error", error);

    onClose();
    updateNotification("success", message);
    onSuccess(reviews);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
