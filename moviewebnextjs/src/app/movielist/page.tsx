// "use client";

// import useFetchAllMovies from '../hooks/useFetchAll';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const MyList = () => {
//   const { movies, loading, error } = useFetchAllMovies();
//   const [favorites, setFavorites] = useState<number[]>([]);

//   useEffect(() => {
//     const saved = window.localStorage.getItem('favorites');
//     if (saved) setFavorites(JSON.parse(saved));
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const favoriteMovies = movies.filter(m => favorites.includes(m.id));

//   return (
//     <div className="p-4 bg-black text-white min-h-screen max-w-7xl mx-auto">
//       <h1 className="text-3xl mb-4">My Favorite Movies</h1>
//       {favoriteMovies.length === 0 && <p>You have no favorite movies yet.</p>}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {favoriteMovies.map(movie => (
//           <Link key={movie.id} href={`/singlemovie/${movie.id}`}>
//             <div className="cursor-pointer group relative">
//               {movie.poster_path ? (
//                 <Image
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                   width={150}
//                   height={225}
//                   className="rounded-lg shadow-lg group-hover:scale-105 transition-transform"
//                 />
//               ) : (
//                 <div className="w-full h-56 bg-gray-700 rounded-lg flex items-center justify-center">
//                   No poster available
//                 </div>
//               )}
//               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1 text-center text-white text-sm">
//                 {movie.title}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyList;


"use client";
import useFetchAllMovies from "../hooks/useFetchAll";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const MyList = () => {
  const { movies, loading, error } = useFetchAllMovies();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    }
  }, []);

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  const favoriteMovies = movies.filter((m) => favorites.includes(m.id));

  return (
    <div className="p-4 bg-black text-white min-h-screen max-w-7xl mx-auto">
      <h1 className="text-3xl mb-4">My Favorite Movies</h1>
      {favoriteMovies.length === 0 && <p>You have no favorite movies yet.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favoriteMovies.map((movie) => (
          <Link key={movie.id} href={`/singlemovie/${movie.id}`}>
            <div className="cursor-pointer group relative">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={150}
                  height={225}
                  className="rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-56 bg-gray-700 rounded-lg flex items-center justify-center">
                  No poster available
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1 text-center text-white text-sm">
                {movie.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyList;
