async function getCards() {
  try {
    const res = await fetch("http://localhost:5000/cards/due", { cache: "no-store" });
    return res.json();
  } catch {
    return [];
  }
}

export default async function StudyPage() {
  const cards = await getCards();
  const card = cards[0];

  return (
    <div className="card">
      <h1>Study Mode</h1>
      {!card ? (
        <p>No due cards found.</p>
      ) : (
        <>
          <p className="small">Card type: {card.type}</p>
          <h3>{card.question}</h3>
          <details>
            <summary>Show Answer</summary>
            <p>{card.answer}</p>
          </details>
        </>
      )}
    </div>
  );
}
