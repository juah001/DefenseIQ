export const dynamic = "force-dynamic";

type Deck = {
  id: number | string;
  title: string;
  author?: string;
  rating?: number;
  downloads?: number;
  description?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getDecks(): Promise<Deck[]> {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${API}/marketplace/decks`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Marketplace API failed:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Marketplace API did not return an array");
      return [];
    }

    return data.map((deck, index) => ({
      id: deck.id ?? index,
      title: deck.title ?? "Untitled Deck",
      author: deck.author ?? "Unknown",
      rating: deck.rating ?? 0,
      downloads: deck.downloads ?? 0,
      description: deck.description ?? "",
    }));
  } catch (error) {
    console.error(`Failed to fetch marketplace decks from ${API}/marketplace/decks:`, error);
    return [];
  }
}

export default async function MarketplacePage() {
  const decks = await getDecks();

  return (
    <main>
      <h1>Marketplace</h1>
      <p>Browse shared decks from the community.</p>

      {decks.length === 0 ? (
        <p>No marketplace decks available right now.</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              <strong>{deck.title}</strong>
              <p>Author: {deck.author}</p>
              <p>Rating: {deck.rating}</p>
              <p>Downloads: {deck.downloads}</p>
              {deck.description ? <p>{deck.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}