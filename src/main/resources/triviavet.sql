drop database if exists trivia_dev; 

create database if not exists trivia_dev;
use trivia_dev;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    id integer auto_increment primary key,
    username varchar(20) not null ,
    password varchar(20) not null,
    name varchar(20) not null,
    lastname varchar(20) null,
    dni integer unique not null,
    admin BOOLEAN not null default 0,
    created_at DATETIME,
	updated_at DATETIME,
    unique(username)
);

DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions(
    id integer auto_increment primary key,
	category varchar(30) not null,
    description varchar(100) not null,
    see BOOLEAN not null default 0,
    created_at DATETIME,
	updated_at DATETIME
);

DROP TABLE IF EXISTS options;
CREATE TABLE IF NOT EXISTS options(
    id integer auto_increment primary key,
    description varchar(100) not null,
    correct boolean default 0,
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
