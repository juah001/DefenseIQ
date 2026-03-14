type Deck = {
  id: number;
  title: string;
  author: string;
  rating: number;
  downloads: number;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getDecks(): Promise<Deck[]> {
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
      console.error("Marketplace API did not return an array:", data);
      return [];
    }

    return data as Deck[];
  } catch (error) {
    console.error("Failed to fetch marketplace decks:", error);
    return [];
  }
}

export default async function MarketplacePage() {
  const decks = await getDecks();

  return (
    <div>
      <h1>Deck Marketplace</h1>
      <div className="grid grid-3">
        {decks.map((deck) => (
          <div key={deck.id} className="card">
            <h3>{deck.title}</h3>
            <p className="small">By {deck.author}</p>
            <p>Rating: {deck.rating}</p>
            <p>Downloads: {deck.downloads}</p>
            <button className="button">Save Deck</button>
          </div>
        ))}
      </div>
    </div>
  );
}
