CREATE DATABASE posts;
\connect posts;
CREATE TABLE textData (
	id        SERIAL PRIMARY KEY,
	title       TEXT,
	text        TEXT
);