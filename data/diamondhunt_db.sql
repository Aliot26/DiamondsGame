-- Database: diamondhunt_db

-- DROP DATABASE diamondhunt_db;

CREATE DATABASE diamondhunt_db
  WITH
  OWNER = olga
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;


DROP TABLE IF EXISTS user_score;

CREATE TABLE user_score (
  id serial PRIMARY KEY,
  username varchar(250) NOT NULL,
  score int,
  date_time timestamp without time zone
)


