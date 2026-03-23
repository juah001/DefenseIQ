export default function TutorPage() {
  return (
    <div className="card">
      <h1>AI Tutor</h1>
      <p>Ask for explanations, examples, and mini quizzes. Connect this page to <code>/tutor/ask</code>.</p>
      <input className="input" placeholder="Topic, e.g. DNS tunneling" />
      <div style={{ height: 12 }} />
      <textarea rows="6" placeholder="Ask a question..." />
      <div style={{ height: 12 }} />
      <button className="button">Ask Tutor</button>
    </div>
  );
}
