"use client";

import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../utils/fetchMovieDetails";

interface MovieDetailsType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits: { cast: { name: string }[] };
  videos: { results: { key: string }[] };
  images: { posters: { file_path: string }[] };

}

const useFetchMovieDetails = (id: number) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { movieDetails, loading, error };
};
export default useFetchMovieDetails;