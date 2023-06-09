import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedTVSeries() {
  const [topRatedTVSeries, setTopRatedTVSeries] = useState([]);
  //   const [value, setValue] = useState("");

  //   const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies("TV Series", signal);

    if (error) return;

    setTopRatedTVSeries([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <MovieList title="Viewers Choice (TV Series)" movies={topRatedTVSeries} />
  );
}
