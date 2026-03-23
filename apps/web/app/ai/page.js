export default function AIPage() {
  return (
    <div className="card">
      <h1>AI Flashcard Generator</h1>
      <p>Paste notes and connect this form to <code>/ai/generate-flashcards</code>.</p>
      <textarea rows="10" placeholder="Paste your notes here..." />
      <div style={{ height: 12 }} />
      <button className="button">Generate Flashcards</button>
    </div>
  );
}
