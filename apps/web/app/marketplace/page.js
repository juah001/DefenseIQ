async function getDecks() {
  try {
    const res = await fetch("http://localhost:5000/marketplace/decks", { cache: "no-store" });
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

export default function Page() {
  return (
    <div className="grid grid-3">
      <div className="card">
        <div className="small">Today</div>
        <div className="metric">50</div>
        <div>Cards target</div>
      </div>
      <div className="card">
        <div className="small">Streak</div>
        <div className="metric">12</div>
        <div>Study days</div>
      </div>
      <div className="card">
        <div className="small">Labs</div>
        <div className="metric">2</div>
        <div>Active scenarios</div>
      </div>
      <div className="card">
        <h2>Platform Overview</h2>
        <p>
          This starter app brings together flashcards, coding practice, labs,
          AI card generation, tutoring, analytics, and a shared deck marketplace.
        </p>
      </div>
    </div>
  );
}
