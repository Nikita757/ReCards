CREATE TABLE users(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);


CREATE TABLE decks(
    deck_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creator VARCHAR(255),
    CONSTRAINT fk_user
        FOREIGN KEY(creator) 
        REFERENCES users(username) ON DELETE CASCADE
);


CREATE TABLE cards(
    card_id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    last_answered TIMESTAMP DEFAULT NOW(),
    show_after TIMESTAMP DEFAULT NOW(),
	deck_id SERIAL,
    CONSTRAINT fk_deck
        FOREIGN KEY(deck_id) 
        REFERENCES decks(deck_id) ON DELETE CASCADE
);
