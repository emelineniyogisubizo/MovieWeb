"use client";

import { useEffect, useState } from "react";
import { fetchAllMovies } from "../utils/fetchAll";

export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  backdrop_path?: string;
  vote_average: number;
  runtime?: number;
  release_date?: string;
  overview?: string;
  number_of_episodes?: number;
}

const useFetchAllMovies = () => {
  const [movies, setMovies] = useState<Array<MovieType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const moviesData = await fetchAllMovies();
        setMovies(moviesData?.results || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { movies, loading, error };
};
export default useFetchAllMovies;