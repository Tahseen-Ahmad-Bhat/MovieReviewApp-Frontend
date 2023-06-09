import React, { useEffect } from "react";
import MovieListItem from "./MovieListItem";

import { useMovies } from "../hooks";

export default function LatestUploads() {
  const { latestUploads, fetchLatestUploads } = useMovies();

  const handleUIUpdate = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className=" font-semibold text-2xl mb-4 text-primary dark:text-white text-center">
          Recent Uploads
        </h1>

        <div className="space-y-3">
          {latestUploads.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
            />
          ))}
        </div>
      </div>
    </>
  );
}
