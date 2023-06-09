import React, { createContext, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotification } from "../hooks";

export const MovieContext = createContext();

let currentPageNo = 0;
const limit = 2;

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (qty = 5) => {
    const { error, movies } = await getMovies(0, qty);

    if (error) return updateNotification("error", error);

    setLatestUploads([...movies]);
  };

  const fetchMovies = async (pageNo = currentPageNo) => {
    console.log(pageNo);
    const { movies, error } = await getMovies(pageNo, limit);

    if (error) return updateNotification("error", error);

    if (!movies.length) {
      currentPageNo = pageNo - 1;
      setShowNextButton(false);
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    setShowPrevButton(true);
    fetchMovies(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    currentPageNo -= 1;
    if (currentPageNo === 0) setShowPrevButton(false);
    if (reachedToEnd) setReachedToEnd(false);

    setShowNextButton(true);

    fetchMovies(currentPageNo);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        latestUploads,
        fetchLatestUploads,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,

        showNextButton,
        showPrevButton,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
