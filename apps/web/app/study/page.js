export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getCards() {
  if (!API) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    return [];
  }

  try {
    const res = await fetch(`${API}/cards/due`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Cards API failed:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Cards API did not return an array");
      return [];
    }

    return data.map((card, index) => ({
      id: card.id ?? index,
      front: card.front ?? card.question ?? "Untitled Card",
      back: card.back ?? card.answer ?? "",
    }));
  } catch (error) {
    console.error(`Failed to fetch cards from ${API}/cards/due:`, error);
    return [];
  }
}

export default async function StudyPage() {
  const cards = await getCards();

  return (
    <main>
      <h1>Study</h1>
      <p>Review your due flashcards below.</p>

      {cards.length === 0 ? (
        <p>No cards due right now.</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <strong>{card.front}</strong>
              {card.back ? <p>{card.back}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}