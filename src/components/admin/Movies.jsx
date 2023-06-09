import React, { useEffect } from "react";
import MovieListItem from "../MovieListItem";

import { useMovies } from "../../hooks";
import NextAndPrevButton from "../NextAndPrevButton";

export default function Movies() {
  const {
    fetchMovies,
    movies,
    fetchNextPage,
    fetchPrevPage,
    showNextButton,
    showPrevButton,
  } = useMovies();

  // const fetchMovies = async (pageNo) => {
  //   const { movies, error } = await getMovies(pageNo, limit);

  //   if (error) return updateNotification("error", error);

  //   if (!movies.length) {
  //     currentPageNo = pageNo - 1;
  //     setShowNextButton(false);
  //     return setReachedToEnd(true);
  //   }

  //   setMovies([...movies]);
  // };

  // const handleOnNextClick = () => {
  //   if (reachedToEnd) return;
  //   currentPageNo += 1;
  //   setShowPrevButton(true);
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnPrevClick = () => {
  //   if (currentPageNo <= 0) return;
  //   currentPageNo -= 1;
  //   if (currentPageNo === 0) setShowPrevButton(false);
  //   if (reachedToEnd) setReachedToEnd(false);

  //   setShowNextButton(true);

  //   fetchMovies(currentPageNo);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);

  //   if (error) return updateNotification("error", error);

  //   setSelectedMovie(movie);

  //   setShowUpdateMovieModal(true);
  // };

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);

  //   const { error, message } = await deleteMovie(selectedMovie.id);

  //   setBusy(false);

  //   if (error) return updateNotification("error", error);

  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(currentPageNo);
  // };

  // const hideUpdateMovieModal = () => {
  //   setShowUpdateMovieModal(false);
  // };

  // const hideConfirmModal = () => setShowConfirmModal(false);

  // const handleOnUpdate = (updatedMovie) => {
  //   const updateMovies = movies.map((movie) =>
  //     movie.id === updatedMovie.id ? updatedMovie : movie
  //   );

  //   setMovies([...updateMovies]);
  // };

  const handleUIUpdate = () => fetchMovies();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {movies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
            />
          );
        })}

        <NextAndPrevButton
          className="mt-5"
          showPrevBtn={showPrevButton}
          showNextBtn={showNextButton}
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>
    </>
  );
}
