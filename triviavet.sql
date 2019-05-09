CREATE DATABASE IF NOT EXISTS trivia_dev;
use trivia_dev;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id integer auto_increment primary key,
    username varchar(20),
    password varchar(20),
    name varchar(20),
    lastname varchar(20),
    dni integer,
    admin bool
);
DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions(
    id integer auto_increment primary key,
	category varchar(30),
    description varchar(100),
    see bool
    
);
DROP TABLE IF EXISTS options;
CREATE TABLE IF NOT EXISTS options(
    id integer auto_increment primary key,
    description varchar(100),
    correct bool,
    question_id int -- ON DELETE CASCADE
);	