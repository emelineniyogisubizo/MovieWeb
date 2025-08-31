export async function fetchMovieDetails(id:number) {
  try {
    const response = await fetch(`/api/movie/${id}`);
    if (!response.ok) {
      throw new Error("Something went wrong" + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch movie details' + (error as Error).message);
  }
}