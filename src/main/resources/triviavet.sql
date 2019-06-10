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


insert into questions(category,description,see) values
 ("anatomia","que comen los leones?",false),
 ("quimica","de ques esta hecho una celula?",false),
 ("anatomia","que comen los gatos?",false),
 ("anatomia","que comen los perros?",false),
 ("anatomia","que comen los perros?",false),
 ("animales grandes","que comen los toros?",false);
 
 insert into options(description,correct, question_id) values
 ("carne",true, 1),
 ("pasto",false, 1),
 ("piedras",false, 1),
 ("todas",false, 1),
 
 ("carne",true, 2),
 ("pasto",false, 2),
 ("piedras",false, 2),
 ("todas",false, 2),
 
 ("carne",true, 3),
 ("pasto",false, 3),
 ("piedras",false, 3),
 ("todas",false, 3),
 
 ("carne",true, 4),
 ("pasto",false, 4),
 ("piedras",false, 4),
 ("todas",false, 4),
 
 ("carne",true, 5),
 ("pasto",false, 5),
 ("piedras",false, 5),
 ("todas",false, 5),
 
 ("carne",true, 6),
 ("pasto",false, 6),
 ("piedras",false, 6),
 ("todas",false, 6);
 

 