INSERT INTO users (email, password_hash, display_name)
VALUES ('demo@example.com', 'hashed-password', 'Demo User');

INSERT INTO decks (owner_id, name, description, published)
VALUES
  (1, 'Networking Fundamentals', 'OSI, TCP/IP, DNS, NAT, VLANs', TRUE),
  (1, 'Linux for SOC Analysts', 'Commands, grep, logs, permissions', TRUE);

INSERT INTO cards (deck_id, type, question, answer)
VALUES
  (1, 'flashcard', 'What does DNS stand for?', 'Domain Name System'),
  (2, 'flashcard', 'What command shows current working directory?', 'pwd');
