import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import NotFoundText from "../NotFoundText";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchMovies = async (query) => {
    const { results, error } = await searchMovieForAdmin(query);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  const handleAfterDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m.id !== movie.id);

    setMovies([...updatedMovies]);
  };

  const handleAfterUpdate = (movie) => {
    const updatedMovies = movies.map((m) => (m.id !== movie.id ? m : movie));

    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    if (query) searchMovies(query);
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => (
          <MovieListItem
            key={movie.id}
            movie={movie}
            afterDelete={handleAfterDelete}
            afterUpdate={handleAfterUpdate}
          />
        ))}
    </div>
  );
}
