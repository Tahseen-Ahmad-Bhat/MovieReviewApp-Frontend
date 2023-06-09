import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();

  //   console.log(onUploadProgress);

  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const uploadMovie = async (formData) => {
  const token = getToken();

  //   console.log(onUploadProgress);

  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMovies = async (pageNo, limit) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMovieForUpdate = async (id) => {
  const token = getToken();

  //   console.log(onUploadProgress);

  try {
    const { data } = await client.get("/movie/for-update/" + id, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateMovie = async (id, formData) => {
  const token = getToken();

  //   console.log(onUploadProgress);

  try {
    const { data } = await client.patch("/movie/update/" + id, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteMovie = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.delete("/movie/" + id, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchMovieForAdmin = async (query) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/movie/search?title=${query}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTopRatedMovies = async (type, signal) => {
  try {
    let endpoint = "/movie/top-rated";
    if (type) endpoint = endpoint + "?type=" + type;
    const { data } = await client.get(endpoint, { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getLatestUploads = async (signal) => {
  try {
    const { data } = await client.get("/movie/latest-uploads", { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client.get("/movie/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client.get("/movie/related/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchPublicMovies = async (query) => {
  try {
    const { data } = await client.get(`/movie/search-public?title=${query}`);

    return data;
  } catch (error) {
    return catchError(error);
  }
};
