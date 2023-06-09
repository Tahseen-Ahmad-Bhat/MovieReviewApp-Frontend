import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedWebSeries() {
  const [topRatedWebSeries, setTopRatedWebSeries] = useState([]);
  //   const [value, setValue] = useState("");

  //   const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies("Web Series", signal);

    if (error) return;

    setTopRatedWebSeries([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <MovieList title="Viewers Choice (Web Series)" movies={topRatedWebSeries} />
  );
}
