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
    point integer default 0,
    amount_right integer default 0,
    amount_wrong integer default 0 ,
    created_at DATETIME,
	updated_at DATETIME,
    unique(username)
);

DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions(
    id integer auto_increment primary key,
	category varchar(30) not null,
    description varchar(100) not null,
    see BOOLEAN default 0,
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

DROP TABLE IF EXISTS statistics;
CREATE TABLE IF NOT EXISTS statistics(
	id integer primary key auto_increment,
    amount_user_right integer,
    amount_user_wrong integer,
    question_id integer,
    foreign key(question_id) references questions(id) ON DELETE CASCADE,
    created_at DATETIME,
	updated_at DATETIME
);	

DROP TABLE IF EXISTS answereds;
create table if not exists answereds(
id integer primary key auto_increment,
question_id integer,
user_id integer,
category varchar(30) not null,
foreign key(question_id) references questions(id) ON DELETE CASCADE,
foreign key(user_id) references users(id) ON DELETE CASCADE,
unique (user_id,question_id)
);

DROP TABLE IF EXISTS levels;
create table if not exists levels(
id integer primary key auto_increment,
user_id integer,
level_examen_clinica integer not null,
level_farmacologia integer not null,
level_enfermedades integer not null,
level_clinica_medica integer not null,
level_epidemiologia integer not null,
level_quirurgica integer not null,
foreign key(user_id) references users(id) ON DELETE CASCADE
);

