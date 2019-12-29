-- Create the new database if it does not exist already
SELECT 'CREATE DATABASE "movie_collection"' 
WHERE NOT EXISTS (
  SELECT * FROM pg_database WHERE datname = 'movie_collection'
)\gexec

\c movie_collection 

-- Create a new table called 'movies'
-- Drop the table if it already exists
DROP TABLE IF EXISTS movies;
-- Create the table in the specified schema
CREATE TABLE movies
(
  ID INT NOT NULL PRIMARY KEY, -- primary key column
  "name" VARCHAR(50) NOT NULL,
  "description" VARCHAR(8000),
  "release" DATE,
  "start-time" TIME,
  "end-time" TIME,
  "votes" INT
);

-- Create a new table called 'genres'
-- Drop the table if it already exists
DROP TABLE IF EXISTS genres;
-- Create the table in the specified schema
CREATE TABLE genres
(
  ID INT NOT NULL PRIMARY KEY, -- primary key column
  "project" VARCHAR(50) NOT NULL
  -- specify more columns here
);

-- Create a new table called 'm_g'
-- Drop the table if it already exists
DROP TABLE IF EXISTS m_g;
-- Create the table in the specified schema
CREATE TABLE m_g
(
  m_id INT NOT NULL,
  g_id INT NOT NULL,
  PRIMARY KEY (m_id, g_id)
);