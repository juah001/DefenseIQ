const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getDecks() {
  try {
    const res = await fetch(`${API}/marketplace/decks`, { cache: "no-store" });
    return res.json();
  } catch {
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
