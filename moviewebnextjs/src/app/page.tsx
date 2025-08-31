"use client";

import useFetchGenres from './hooks/useFetchGenre';
import useFetchAllMovies, { MovieType } from './hooks/useFetchAll';
import Image from 'next/image';
import NavBar from './sharedcomponents/NavBar';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const MovieLanding = () => {
  const { movies, loading: moviesLoading, error: moviesError } = useFetchAllMovies();
  const { genres, loading: genresLoading, error: genresError } = useFetchGenres();

  const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const userSelectedMovieRef = useRef(false);
  useEffect(() => {
    if (movies.length > 0 && !selectedMovie) {
      const maleficent = movies.find(movie => movie.title === 'Maleficent: Mistress of Evil');
      setSelectedMovie(maleficent ?? movies[0]);
    }
  }, [movies, selectedMovie]);

  useEffect(() => {
    let updatedMovies = movies;
    if (selectedGenreId !== null) {
      updatedMovies = updatedMovies.filter(movie =>
        movie.genre_ids && movie.genre_ids.includes(selectedGenreId)
      );
    }
    if (searchQuery.trim() !== '') {
      updatedMovies = updatedMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredMovies(updatedMovies);
  }, [selectedGenreId, searchQuery, movies]);

  useEffect(() => {
    if (filteredMovies.length === 0) return;
    if (userSelectedMovieRef.current) return;

    const intervalId = setInterval(() => {
      setSelectedMovie(prev => {
        if (!prev) return filteredMovies[0];
        const currentIndex = filteredMovies.findIndex(m => m.id === prev.id);
        const nextIndex = (currentIndex + 1) % filteredMovies.length;
        return filteredMovies[nextIndex];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [filteredMovies]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const onMovieClick = (movie: MovieType) => {
    userSelectedMovieRef.current = true;

  };

  if (moviesLoading || genresLoading)
    return <div className="text-white text-center py-10">Loading...</div>;
  if (moviesError || genresError)
    return <div className="text-red-500 text-center py-10">Error: {moviesError || genresError}</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />

      {selectedMovie && (
        <section
          className="relative w-[90vw] h-[95vh] bg-cover bg-center ml-19"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path || selectedMovie.poster_path})`,
          }}
        >
          <div className="absolute bottom-20 left-0 p-4 bg-opacity-70 text-black w-[35vw] mx-auto mb-1">
            <h2 className="text-4xl font-bold text-yellow-500 mb-1">{selectedMovie.title}</h2>
            <div className="flex items-center text-gray-700 text-md mb-2 space-x-2">
              {selectedMovie.runtime && <span>{selectedMovie.runtime}m</span>}
              <span>•</span>
              {selectedMovie.release_date && <span>{selectedMovie.release_date.slice(0, 4)}</span>}
              {selectedMovie.number_of_episodes !== undefined && <>
                <span>•</span>
                <span>{selectedMovie.number_of_episodes} Episodes</span>
              </>}
            </div>
            <p className="text-gray-400 text-[15px] mb-4 leading-relaxed whitespace-pre-line">
              {selectedMovie.overview}
            </p>
            <div className="flex space-x-3">
              <button className="bg-red-500 text-black px-17 py-4 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                Watch Now
              </button>
              <button
                onClick={() => toggleFavorite(selectedMovie.id)}
                className=" text-white px-17 py-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors border-red-600 border-2"
              >
                {favorites.includes(selectedMovie.id) ? 'Remove From Favourites' : 'Add To Favourites'}
              </button>
            </div>
          </div>
        </section>
      )}
      <section className="p-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
        />
      </section>

      <div className="flex space-x-2 p-4   mx-auto w-[90vw]">
        <button
          className="bg-red-500 text-black px-3 py-1 rounded-md"
          onClick={() => setSelectedGenreId(null)}
        >
          All
        </button>
        {genres.map(genre => (
          <button
            key={genre.id}
            className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors text-[15px]"
            onClick={() => setSelectedGenreId(genre.id)}
          >
            {genre.name}
          </button>
        ))}
        <span className="text-red-500 mt-1">›</span>
      </div>

      <section className="p-4  mx-auto   w-[90vw]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {selectedGenreId
              ? `Movies in ${genres.find(g => g.id === selectedGenreId)?.name || 'Selected Genre'}`
              : searchQuery.trim() !== ''
                ? `Search results for "${searchQuery}"`
                : 'Most viewed'}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="relative group block cursor-pointer"
              onClick={() => onMovieClick(movie)}
            >
              <Link href={`/singlemovie/${movie.id}`}>
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={150}
                    height={225}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-700 rounded-lg flex items-center justify-center">
                    No poster available
                  </div>
                )}
              </Link>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default MovieLanding;