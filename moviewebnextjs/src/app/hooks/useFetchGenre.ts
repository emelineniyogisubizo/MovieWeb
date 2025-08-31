
import { useEffect, useState } from "react";
import { fetchGenres} from "../utils/fetchGenre";


interface GenreType {
  id: number;
  name: string;
}

const useFetchGenres = () => {
  const [genres, setGenres] = useState<Array<GenreType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData?.genres || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { genres, loading, error };
};
export default useFetchGenres;