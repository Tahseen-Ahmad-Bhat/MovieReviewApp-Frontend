import React, { useEffect, useState } from "react";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import { useParams } from "react-router-dom";
import { getReviewsByMovie, removeReview } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "../modals/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../modals/EditRatingModal";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditRatingModal, setShowEditRatingModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);

  const { movieId } = useParams();

  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { error, movie } = await getReviewsByMovie(movieId);

    if (error) return updateNotification("error", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);

    const matched = reviews.find((review) => review.owner.id === profileId);
    if (!matched)
      return updateNotification(
        "error",
        "You don't have any review for this movie!"
      );

    setProfileOwnersReview(matched);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);

  const hideEditRatingModal = () => {
    setShowEditRatingModal(false);
    setSelectedReview(null);
  };

  const handleOnConfirmDelete = async (reviewId) => {
    setBusy(true);
    const { error, message } = await removeReview(reviewId);
    setBusy(false);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleEditClick = () => {
    const { id, content, rating } = profileOwnersReview;
    setSelectedReview({
      id,
      content,
      rating,
    });
    setShowEditRatingModal(true);
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnersReview,
      content: review.content,
      rating: review.rating,
    };

    setProfileOwnersReview({
      ...updatedReview,
    });

    const newReviews = reviews.map((r) =>
      r.id === updatedReview.id ? updatedReview : r
    );
    setReviews([...newReviews]);
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-3 py-8 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:
            </span>
            {" " + movieTitle}
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : null}
        </div>

        <NotFoundText text="No Reviews Available!" visible={!reviews.length} />

        {profileOwnersReview ? (
          <div>
            <ReviewCard review={profileOwnersReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button type="button" onClick={displayConfirmModal}>
                <BsTrash />
              </button>
              <button type="button" onClick={handleEditClick}>
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </Container>

      <ConfirmModal
        visible={showConfirmModal}
        busy={busy}
        title="Are you sure?"
        subtitle="This action is going to remove this review permanently!"
        onCancel={hideConfirmModal}
        onConfirm={() => handleOnConfirmDelete(profileOwnersReview.id)}
      />

      <EditRatingModal
        visible={showEditRatingModal}
        initialState={selectedReview}
        onClose={hideEditRatingModal}
        onSuccess={handleOnReviewUpdate}
      />
    </div>
  );
}

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { owner, content, rating } = review;

  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};
