import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (movieId, reviewData) => {
  const token = getToken();

  try {
    const { data } = await client.post("/review/add/" + movieId, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewsByMovie = async (movieId) => {
  try {
    const { data } = await client.get(
      "/review/get-reviews-by-movie/" + movieId
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const removeReview = async (reviewId) => {
  const token = getToken();

  try {
    const { data } = await client.delete("/review/delete/" + reviewId, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateReview = async (reviewId, reviewData) => {
  const token = getToken();

  try {
    const { data } = await client.patch(
      "/review/update/" + reviewId,
      reviewData,
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};
