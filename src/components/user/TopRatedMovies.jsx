import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedMovies() {
  const [topRatedMovies, SetTopRatedMovies] = useState([]);
  //   const [value, setValue] = useState("");

  //   const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies(null, signal);

    if (error) return;

    SetTopRatedMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList title="Viewers Choice (Movies)" movies={topRatedMovies} />;
}
