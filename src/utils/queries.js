export const init = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS manuscripts;
DROP TABLE IF EXISTS authors;
`

export const createAuthorsTable = `
CREATE TABLE authors (
  authorId UUID PRIMARY KEY
  	DEFAULT uuid_generate_v1(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(300) NOT NULL,
  writingLevel VARCHAR(100),
  manuscriptCap INT NOT NULL, 
  myManuscripts TEXT [],
  myDrafts TEXT [],
  masterManuscriptMatches TEXT []
);
`;

export const createManuscriptsTable = `
CREATE TABLE manuscripts (
  manuscriptId UUID PRIMARY KEY
  	DEFAULT uuid_generate_v1(),
  authorId UUID REFERENCES authors(authorId)
  	ON DELETE SET NULL
  	ON UPDATE NO ACTION,
  title VARCHAR(200) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  form VARCHAR(100) NOT NULL,
  blurb VARCHAR(1000) NOT NULL,
  wordCount INT NOT NULL,
  series BOOLEAN,
  genreFluidity NUMERIC,
  waitingList TEXT [],
  manuscriptMatches TEXT []
);
`

export const insertAuthors = `
INSERT INTO authors (name, email, writingLevel, manuscriptCap)
VALUES ('J. K. Rowling', 'jk@rowling.com', 'Professional', 10),
	   ('Jane Doe', 'jane@doe.com', 'Amateur', 3);
`

export const insertManuscripts2 = `
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO manuscripts(authorid, title, genre, form, blurb, wordCount)
VALUES ('cb55dd3c-286d-4409-b2c7-0ca7926e82fc', 'Some title', 'Fantasy',   'Novel', 'synopsis', 123)
`

export const insertManuscripts = `
INSERT INTO manuscripts (authorId, title, genre, form, blurb, wordCount)
SELECT authorId, 'Fifty Shades of Gray', 'Romance', 'Novel', 'Some dude and some girl', 50000
FROM authors WHERE name = 'J. K. Rowling'
UNION ALL
SELECT authorId, 'Harry Potter and the Chamber of Secrets', 'Fantasy', 'Novel', 'There is a snake somewhere', 40000
FROM authors WHERE name = 'Jane Doe'
UNION ALL
SELECT authorId, 'The Old Man and the Sea', 'Literary', 'Short Story', 'An old man goes on a boat somewhere', 15000
FROM authors WHERE name = 'J. K. Rowling'
UNION ALL
SELECT authorId, 'One Hundred Words', 'Literary', 'Flash Fiction', 'A story in a hundred words', 100
FROM authors WHERE name = 'Jane Doe';
`

export const dropAuthorsTable = 'DROP TABLE authors';

export const dropManuscriptsTable = 'DROP TABLE manuscripts';


