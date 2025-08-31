const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

export async function GET(request: Request, { params }: {params: Promise<{id: string}>}) {
  const { id } = await params;

  try {
    if (!baseUrl || !apiKey) {
      return new Response('Missing environment variables', { status: 500 });
    }

    if (!id) {
      return new Response('Movie ID is required', { status: 400 });
    }

    const response = await fetch(
      `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos,images`
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}