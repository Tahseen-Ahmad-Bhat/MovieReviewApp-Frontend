import React, { useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { deleteMovie, getMovieForUpdate } from "../api/movie";
import { useNotification } from "../hooks";
import UpdateMovie from "./modals/UpdateMovie";
import ConfirmModal from "./modals/ConfirmModal";
import { getPoster } from "../utils/helper";

export default function MovieListItem({ movie, afterDelete, afterUpdate }) {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showUpdateMovieModal, setShowUpdateMovieModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { updateNotification } = useNotification();
  // const { handleOnUpdateSuccess } = useMovies();

  const displayConfirmModal = () => setShowConfirmModal(true);

  const hideConfirmModal = () => setShowConfirmModal(false);

  const handleOnEditClick = () => {
    setShowUpdateMovieModal(true);
    setSelectedMovieId(movie.id);
  };

  const hideUpdateMovieModal = () => setShowUpdateMovieModal(false);

  const handleOnDeleteConfirm = async () => {
    setBusy(true);

    const { error, message } = await deleteMovie(movie.id);

    setBusy(false);

    if (error) return updateNotification("error", error);

    hideConfirmModal();
    updateNotification("success", message);
    afterDelete(movie);
  };

  const handleOnUpdate = (updatedMovie) => {
    afterUpdate(updatedMovie);
    setShowUpdateMovieModal(false);
    setSelectedMovieId(null);
  };

  return (
    <>
      <MovieCard
        movie={movie}
        onEditClick={handleOnEditClick}
        onDeleteClick={displayConfirmModal}
      />

      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          busy={busy}
          title="Are you Sure?"
          subtitle="This action is going to delete the movie permanently!"
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
        />

        <UpdateMovie
          visible={showUpdateMovieModal}
          movieId={selectedMovieId}
          onSuccess={handleOnUpdate}
          onClose={hideUpdateMovieModal}
        />
      </div>
    </>
  );
}

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, responsivePosters, title, genres = [], status } = movie;

  return (
    <table className="w-full border-b">
      <tbody className="">
        <tr>
          <td>
            <div className="w-24">
              <img
                className="w-full aspect-video"
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>

          <td className="w-full pl-5">
            <div>
              <h1 className="font-semibold text-primary dark:text-white text-lg">
                {title}
              </h1>
              <div className=" space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className=" text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button" title="Delete">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button" title="Edit">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button" title="Open">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
