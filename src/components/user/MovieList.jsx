import React from "react";
import GridContainer from "../GridContainer";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";
import { getPoster } from "../../utils/helper";

const trimText = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-lg dark:text-white text-secondary font-semibold mb-4">
          {title}
        </h1>
      ) : null}
      <GridContainer className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3">
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { title, poster, responsivePosters, reviews, id } = movie;
  return (
    <Link to={"movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={getPoster(responsivePosters) || poster}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold "
        title={title}
      >
        {trimText(title)}
      </h1>
      <RatingStar rating={reviews?.ratingAvg} />
    </Link>
  );
};
