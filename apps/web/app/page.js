"use client";

import { useEffect } from "react";
import { trackEvent } from "../src/utils/analytics";

export default function HomePage() {
  useEffect(() => {
    trackEvent("page_view", "user-1", {
      page: window.location.pathname,
    });
  }, []);

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
        <h2>DefenseIQ Platform Overview</h2>
        <p>
          DefenseIQ is a cybersecurity learning platform that combines spaced
          repetition, AI-assisted study, progress analytics, deck sharing, and
          hands-on lab scaffolds in one full-stack system.
        </p>
      </div>

      <div className="card">
        <h3>Core Learning Modes</h3>
        <ul className="clean">
          <li>Flashcard study</li>
          <li>Deck marketplace</li>
          <li>Progress analytics</li>
          <li>AI flashcard generation</li>
          <li>AI tutoring</li>
          <li>Cybersecurity labs</li>
        </ul>

        <button
          onClick={() =>
            trackEvent("button_click", "user-1", {
              button: "start-learning",
              page: "dashboard",
            })
          }
        >
          Start Learning
        </button>
      </div>

      <div className="card">
        <h3>Why this project matters</h3>
        <p>
          This project demonstrates full-stack engineering, monorepo design,
          deployment readiness, API architecture, and security-minded product
          thinking.
        </p>
      </div>
    </div>
  );
}