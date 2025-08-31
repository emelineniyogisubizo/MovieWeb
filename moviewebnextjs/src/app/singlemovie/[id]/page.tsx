"use client";
import useFetchMovieDetails from "@/app/hooks/useFetchMovieDetails";
import Image from "next/image";
import NavBar from "@/app/sharedcomponents/NavBar";
import { useParams } from "next/navigation";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { movieDetails, loading, error } = useFetchMovieDetails(movieId);

  if (loading)
    return <div className="text-white text-center py-10">Loading movie details...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  if (!movieDetails)
    return <div className="text-white text-center py-10">Movie not found</div>;

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-indigo-950 min-h-screen text-white">
      <NavBar />
      <section className="p-8 max-w-7xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            {movieDetails.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
                width={300}
                height={450}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                No poster available
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold text-red-500 mb-4">{movieDetails.title}</h1>
            <p className="text-gray-400 text-sm mb-2">
              Release Date: {movieDetails.release_date}
            </p>
            <p className="text-gray-400 text-sm mb-2">
              Rating: {movieDetails.vote_average} / 10
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-white mb-4">{movieDetails.overview}</p>

            <h2 className="text-2xl font-bold mb-2 text-red-500">Cast</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {movieDetails.credits.cast.slice(0, 5).map((actor) => (
                <span
                  key={actor.name}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {actor.name}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-2 text-red-500">Trailers</h2>
            {movieDetails.videos.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movieDetails.videos.results.slice(0, 2).map((video) => (
                  <iframe
                    key={video.key}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={movieDetails.title + " Trailer"}
                    width="100%"
                    height="315"
                    className="rounded-md shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No trailers available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsPage;
