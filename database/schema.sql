CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE decks (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  deck_id INT REFERENCES decks(id),
  type TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  card_id INT REFERENCES cards(id),
  interval INT DEFAULT 1,
  ease_factor NUMERIC(4,2) DEFAULT 2.50,
  repetitions INT DEFAULT 0,
  next_review DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE marketplace_listings (
  id SERIAL PRIMARY KEY,
  deck_id INT REFERENCES decks(id),
  rating NUMERIC(3,2) DEFAULT 5.00,
  downloads INT DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW()
);
