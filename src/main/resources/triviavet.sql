drop database if exists trivia_dev; 

create database if not exists trivia_dev;
use trivia_dev;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id integer auto_increment primary key,
    username varchar(20) ,
    password varchar(20),
    name varchar(20),
    lastname varchar(20),
    dni integer unique,
    admin BOOLEAN,
    created_at DATETIME,
	updated_at DATETIME,
    unique(username)
);

DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions(
    id integer auto_increment primary key,
	category varchar(30),
    description varchar(100),
    created_at DATETIME,
	updated_at DATETIME
);

DROP TABLE IF EXISTS options;
CREATE TABLE IF NOT EXISTS options(
    id integer auto_increment primary key,
    description varchar(100),
    correct varchar(10),
    question_id int,
    foreign key(question_id) references questions(id) ON DELETE CASCADE,
    created_at DATETIME,
	updated_at DATETIME
);	

DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games(
	id int primary key auto_increment,
	point int,
    amount_right int,
    amount_wrong int,
    user_id integer,
    foreign key(user_id) references users(id) ON DELETE CASCADE,
    created_at DATETIME,
	updated_at DATETIME
);	
