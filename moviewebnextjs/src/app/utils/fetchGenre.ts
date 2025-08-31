export async function fetchGenres() {
  try {
    const response = await fetch('/api/genre');
    if (!response.ok) {
      throw new Error("Something went wrong" + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch genres' + (error as Error).message);
  }
}