import "./globals.css";

export const metadata = {
  title: "Tech Learning Platform",
  description: "Next-level study platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <a href="/">Dashboard</a>
            <a href="/study">Study</a>
            <a href="/marketplace">Marketplace</a>
            <a href="/analytics">Analytics</a>
            <a href="/ai">AI Generator</a>
            <a href="/tutor">AI Tutor</a>
            <a href="/labs">Labs</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
